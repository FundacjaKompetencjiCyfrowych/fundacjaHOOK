import { Button, Card, Flex, Stack, Text } from "@sanity/ui";
import { PatchEvent, set, useFormValue, type ObjectInputProps } from "sanity";
import { useCallback, useEffect, useRef, useState } from "react";

type Coordinates = { lat?: number; lng?: number };

const STREET_TYPE_PREFIX =
  /^(?:ul(?:ica)?|al(?:eja)?|pl(?:ac)?|os(?:iedle)?|rondo|skwer|bulw(?:ar)?|rynek|park|droga)\.?\s+/i;

function normalizeGeocodingAddress(address: string) {
  let normalized = address.trim().replace(/\s+/g, " ");
  while (STREET_TYPE_PREFIX.test(normalized)) {
    normalized = normalized.replace(STREET_TYPE_PREFIX, "").trim();
  }
  return normalized;
}

export function WorkshopCoordinatesInput(props: ObjectInputProps<Coordinates>) {
  const { onChange, renderDefault } = props;
  const location = useFormValue(["location"]) as string | undefined;
  const hasCoordinates = props.value?.lat != null && props.value?.lng != null;
  const previousLocation = useRef(location);
  const lastAutomaticLookup = useRef("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const lookupCoordinates = useCallback(
    async (address: string) => {
      const query = normalizeGeocodingAddress(address);
      const params = new URLSearchParams({
        q: query,
        format: "jsonv2",
        limit: "1",
        "accept-language": "pl",
      });
      const response = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
        headers: { Accept: "application/json" },
        referrerPolicy: "strict-origin-when-cross-origin",
      });
      if (!response.ok) throw new Error("Geokoder jest chwilowo niedostępny.");
      const results = (await response.json()) as Array<{
        lat: string;
        lon: string;
        display_name: string;
      }>;
      const result = results[0];
      if (!result) {
        setMessage(`Nie znaleziono adresu „${query}”. Wpisz współrzędne ręcznie.`);
        return;
      }
      onChange(PatchEvent.from(set({ lat: Number(result.lat), lng: Number(result.lon) })));
      setMessage(`Znaleziono: ${result.display_name}`);
    },
    [onChange]
  );

  useEffect(() => {
    const address = location?.trim();
    const addressChanged = previousLocation.current !== location;
    previousLocation.current = location;
    if (
      !address ||
      (!addressChanged && (hasCoordinates || lastAutomaticLookup.current === address))
    ) {
      return;
    }

    const timeout = window.setTimeout(() => {
      lastAutomaticLookup.current = address;
      setBusy(true);
      setMessage("Wyszukiwanie współrzędnych adresu…");
      void lookupCoordinates(address)
        .catch((error: unknown) => {
          setMessage(error instanceof Error ? error.message : "Nie udało się wyszukać adresu.");
        })
        .finally(() => setBusy(false));
    }, 1500);
    return () => window.clearTimeout(timeout);
  }, [location, hasCoordinates, lookupCoordinates]);

  const findCoordinates = async () => {
    const address = location?.trim();
    if (!address) {
      setMessage("Najpierw wpisz adres warsztatu.");
      return;
    }

    setBusy(true);
    setMessage("");
    try {
      await lookupCoordinates(address);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Nie udało się wyszukać adresu.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Stack space={3}>
      {renderDefault(props)}
      <Flex gap={3} align="center" wrap="wrap">
        <Button
          text={busy ? "Wyszukiwanie…" : "Szukaj współrzędnych z adresu"}
          mode="ghost"
          onClick={findCoordinates}
          disabled={busy || !location?.trim()}
        />
        <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">
          <Text size={1} muted>
            Geokodowanie: OpenStreetMap / Nominatim
          </Text>
        </a>
      </Flex>
      {message && (
        <Card padding={3} radius={2} tone={message.startsWith("Nie") ? "caution" : "primary"}>
          <Text size={1}>{message}</Text>
        </Card>
      )}
    </Stack>
  );
}
