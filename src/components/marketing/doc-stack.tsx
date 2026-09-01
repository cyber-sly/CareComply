export function DocStack() {
  return (
    <div className="relative flex h-[420px] items-center justify-center">
      <div
        className="absolute z-10 w-[280px] rounded-md border border-line bg-white p-5 opacity-55 shadow-[0_30px_60px_-20px_rgba(28,43,57,0.25)]"
        style={{ transform: "rotate(4deg) translate(40px, 20px)" }}
      >
        <div className="mb-3 flex justify-between font-mono text-[10px] text-grey-light">
          <span>POLICY 14</span>
          <span>v2.1</span>
        </div>
        <div className="mb-3 font-display text-sm font-bold">Safeguarding Policy</div>
        <div className="space-y-2">
          <div className="h-1.5 w-full rounded bg-paper-deep" />
          <div className="h-1.5 w-4/5 rounded bg-paper-deep" />
          <div className="h-1.5 w-3/5 rounded bg-paper-deep" />
        </div>
      </div>

      <div
        className="absolute z-20 w-[280px] rounded-md border border-line bg-white p-5 shadow-[0_30px_60px_-20px_rgba(28,43,57,0.25)]"
        style={{ transform: "rotate(-4deg) translateX(-30px)" }}
      >
        <div className="mb-3 flex justify-between font-mono text-[10px] text-grey-light">
          <span>CARE PLAN</span>
          <span>EDITABLE</span>
        </div>
        <div className="mb-3 font-display text-sm font-bold">Personal Care Plan</div>
        <div className="space-y-2">
          <div className="h-1.5 w-full rounded bg-paper-deep" />
          <div className="h-1.5 w-full rounded bg-paper-deep" />
          <div className="h-1.5 w-4/5 rounded bg-paper-deep" />
          <div className="h-1.5 w-2/3 rounded bg-paper-deep" />
        </div>
      </div>

      <div className="relative z-30 flex h-[110px] w-[110px] shrink-0 -rotate-12 items-center justify-center rounded-full border-[3px] border-clay text-center">
        <span className="font-mono text-[10px] font-bold leading-tight text-clay">
          CQC &amp; CIW
          <br />
          ALIGNED
        </span>
      </div>
    </div>
  );
}
