import React from "react";
import { Button } from "@/app/_components/ui/button";
import { Mail, ChevronRight, ChevronUp } from "lucide-react";

export const metadata = {
  title: "Button Design System Matrix | Fundacja HOOK",
  description: "Pure Component Matrix for Button System",
};

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] py-16 px-4 sm:px-8 font-sans text-gray-900 overflow-x-auto">
      <div className="max-w-[1280px] mx-auto space-y-8 min-w-[900px]">
        {/* Column Headers */}
        <div className="grid grid-cols-[140px_100px_repeat(2,1fr)] gap-4 items-center text-center font-mono text-sm text-gray-700 font-medium pl-4">
          <div className="col-span-2 text-left"></div>
          <div>Interactive (Hover / Click / Focus)</div>
          <div>Disabled</div>
        </div>

        {/* Outer Purple Dashed Figma Component Container */}
        <div className="relative border-2 border-dashed border-purple-400 rounded-2xl bg-white p-8 sm:p-10 shadow-sm space-y-12">
          {/* Header Title */}
          <div className="flex items-center gap-2 text-purple-600 font-bold text-2xl font-mono">
            <span className="text-xl">❖</span>
            <span>Button</span>
          </div>

          {/* MATRIX ROWS */}

          {/* ========================================================
           * 1. PRIMARY BUTTONS
           * ======================================================== */}
          <div className="space-y-6 border-b border-gray-100 pb-10">
            {/* Row Small */}
            <div className="grid grid-cols-[140px_100px_repeat(2,1fr)] gap-4 items-center">
              <div className="font-mono text-sm font-semibold text-gray-800">
                Primary
              </div>
              <div className="font-mono text-xs text-gray-500">Small</div>
              <div className="flex justify-center">
                <Button variant="default" size="sm">
                  <Mail className="size-3.5" /> Button{" "}
                  <ChevronRight className="size-3.5" />
                </Button>
              </div>
              <div className="flex justify-center">
                <Button variant="default" size="sm" disabled>
                  <Mail className="size-3.5" /> Button{" "}
                  <ChevronRight className="size-3.5" />
                </Button>
              </div>
            </div>

            {/* Row Medium */}
            <div className="grid grid-cols-[140px_100px_repeat(2,1fr)] gap-4 items-center">
              <div></div>
              <div className="font-mono text-xs text-gray-500">Medium</div>
              <div className="flex justify-center">
                <Button variant="default" size="default">
                  <Mail className="size-4" /> Button{" "}
                  <ChevronRight className="size-4" />
                </Button>
              </div>
              <div className="flex justify-center">
                <Button variant="default" size="default" disabled>
                  <Mail className="size-4" /> Button{" "}
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>

            {/* Row Large */}
            <div className="grid grid-cols-[140px_100px_repeat(2,1fr)] gap-4 items-center">
              <div></div>
              <div className="font-mono text-xs text-gray-500">Large</div>
              <div className="flex justify-center">
                <Button variant="default" size="lg">
                  <Mail className="size-4.5" /> Button{" "}
                  <ChevronRight className="size-4.5" />
                </Button>
              </div>
              <div className="flex justify-center">
                <Button variant="default" size="lg" disabled>
                  <Mail className="size-4.5" /> Button{" "}
                  <ChevronRight className="size-4.5" />
                </Button>
              </div>
            </div>
          </div>

          {/* ========================================================
           * 2. SECONDARY BUTTONS
           * ======================================================== */}
          <div className="space-y-6 border-b border-gray-100 pb-10">
            {/* Row Small */}
            <div className="grid grid-cols-[140px_100px_repeat(2,1fr)] gap-4 items-center">
              <div className="font-mono text-sm font-semibold text-gray-800">
                Secondary
              </div>
              <div className="font-mono text-xs text-gray-500">Small</div>
              <div className="flex justify-center">
                <Button variant="secondary" size="sm">
                  <Mail className="size-3.5" /> Button{" "}
                  <ChevronRight className="size-3.5" />
                </Button>
              </div>
              <div className="flex justify-center">
                <Button variant="secondary" size="sm" disabled>
                  <Mail className="size-3.5" /> Button{" "}
                  <ChevronRight className="size-3.5" />
                </Button>
              </div>
            </div>

            {/* Row Medium */}
            <div className="grid grid-cols-[140px_100px_repeat(2,1fr)] gap-4 items-center">
              <div></div>
              <div className="font-mono text-xs text-gray-500">Medium</div>
              <div className="flex justify-center">
                <Button variant="secondary" size="default">
                  <Mail className="size-4" /> Button{" "}
                  <ChevronRight className="size-4" />
                </Button>
              </div>
              <div className="flex justify-center">
                <Button variant="secondary" size="default" disabled>
                  <Mail className="size-4" /> Button{" "}
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>

            {/* Row Large */}
            <div className="grid grid-cols-[140px_100px_repeat(2,1fr)] gap-4 items-center">
              <div></div>
              <div className="font-mono text-xs text-gray-500">Large</div>
              <div className="flex justify-center">
                <Button variant="secondary" size="lg">
                  <Mail className="size-4.5" /> Button{" "}
                  <ChevronRight className="size-4.5" />
                </Button>
              </div>
              <div className="flex justify-center">
                <Button variant="secondary" size="lg" disabled>
                  <Mail className="size-4.5" /> Button{" "}
                  <ChevronRight className="size-4.5" />
                </Button>
              </div>
            </div>
          </div>

          {/* ========================================================
           * 3. GHOST / TEXT ONLY
           * ======================================================== */}
          <div className="space-y-6 border-b border-gray-100 pb-10">
            {/* Row Small */}
            <div className="grid grid-cols-[140px_100px_repeat(2,1fr)] gap-4 items-center">
              <div className="font-mono text-sm font-semibold text-gray-800">
                Ghost / Text
              </div>
              <div className="font-mono text-xs text-gray-500">Small</div>
              <div className="flex justify-center">
                <Button variant="ghost" size="sm">
                  <Mail className="size-3.5" /> Button{" "}
                  <ChevronRight className="size-3.5" />
                </Button>
              </div>
              <div className="flex justify-center">
                <Button variant="ghost" size="sm" disabled>
                  <Mail className="size-3.5" /> Button{" "}
                  <ChevronRight className="size-3.5" />
                </Button>
              </div>
            </div>

            {/* Row Medium */}
            <div className="grid grid-cols-[140px_100px_repeat(2,1fr)] gap-4 items-center">
              <div></div>
              <div className="font-mono text-xs text-gray-500">Medium</div>
              <div className="flex justify-center">
                <Button variant="ghost" size="default">
                  <Mail className="size-4" /> Button{" "}
                  <ChevronRight className="size-4" />
                </Button>
              </div>
              <div className="flex justify-center">
                <Button variant="ghost" size="default" disabled>
                  <Mail className="size-4" /> Button{" "}
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>

            {/* Row Large */}
            <div className="grid grid-cols-[140px_100px_repeat(2,1fr)] gap-4 items-center">
              <div></div>
              <div className="font-mono text-xs text-gray-500">Large</div>
              <div className="flex justify-center">
                <Button variant="ghost" size="lg">
                  <Mail className="size-4.5" /> Button{" "}
                  <ChevronRight className="size-4.5" />
                </Button>
              </div>
              <div className="flex justify-center">
                <Button variant="ghost" size="lg" disabled>
                  <Mail className="size-4.5" /> Button{" "}
                  <ChevronRight className="size-4.5" />
                </Button>
              </div>
            </div>
          </div>

          {/* ========================================================
           * 4. ICON ONLY
           * ======================================================== */}
          <div className="space-y-6">
            {/* Row Small */}
            <div className="grid grid-cols-[140px_100px_repeat(2,1fr)] gap-4 items-center">
              <div className="font-mono text-sm font-semibold text-gray-800">
                Icon Only
              </div>
              <div className="font-mono text-xs text-gray-500">Small</div>
              <div className="flex justify-center">
                <Button variant="default" size="icon-sm">
                  <ChevronUp className="size-4" />
                </Button>
              </div>
              <div className="flex justify-center">
                <Button variant="default" size="icon-sm" disabled>
                  <ChevronUp className="size-4" />
                </Button>
              </div>
            </div>

            {/* Row Medium */}
            <div className="grid grid-cols-[140px_100px_repeat(2,1fr)] gap-4 items-center">
              <div></div>
              <div className="font-mono text-xs text-gray-500">Medium</div>
              <div className="flex justify-center">
                <Button variant="default" size="icon">
                  <ChevronUp className="size-4.5" />
                </Button>
              </div>
              <div className="flex justify-center">
                <Button variant="default" size="icon" disabled>
                  <ChevronUp className="size-4.5" />
                </Button>
              </div>
            </div>

            {/* Row Large */}
            <div className="grid grid-cols-[140px_100px_repeat(2,1fr)] gap-4 items-center">
              <div></div>
              <div className="font-mono text-xs text-gray-500">Large</div>
              <div className="flex justify-center">
                <Button variant="default" size="icon-lg">
                  <ChevronUp className="size-5" />
                </Button>
              </div>
              <div className="flex justify-center">
                <Button variant="default" size="icon-lg" disabled>
                  <ChevronUp className="size-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Typography variant={"h2"}>Inputs</Typography>
        <div className="flex justify-evenly">
          <div className="flex flex-col gap-2">
            <Typography>Input normal</Typography>
            <Input placeholder="fundacja@hook.pl" />
            <Typography>Input disabled</Typography>
            <Input placeholder="fundacja@hook.pl" disabled />
          </div>
          <div className="flex flex-col gap-2">
            <Typography>Input error</Typography>
            <Input placeholder="fundacja@hook.pl" aria-invalid="true" />
            <Typography>Input error disabled</Typography>
            <Input
              placeholder="fundacja@hook.pl"
              aria-invalid="true"
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
}
