import Link from "next/link";
/** Replace this accessible fallback with the exact approved logo asset when supplied. */
export function Brand({ light = false }: {light?:boolean}) {
  return <Link href="/" aria-label="Studio Arvi — home" className={`brand${light?" brand-light":""}`}>
    <span className="brand-studio">studio</span><span className="brand-arvi">arvi<span className="brand-period">.</span></span>
  </Link>;
}
