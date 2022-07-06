import { useEffect, useState } from "react";

export default function SvgIcon(props: {
  name: string
}) {
  const [eId, setEId] = useState("");
  useEffect(() => {
    const id = `icon-${props.name}`;
    setEId("#" + id);
    const container = document.getElementById("__ICONSVG_CONTAINER__")!;
    const svgIconList: Set<string> = (window as any).svgIconList || ((window as any).svgIconList = new Set());
    if (!svgIconList.has(id)) {
      svgIconList.add(id);
      import(`../assets/svg/${props.name}.svg?raw`).then((res) => {
        const svgElement = new DOMParser()
          .parseFromString(res.default, "image/svg+xml")
          .querySelector("svg");
        if (svgElement) {
          for (const key of ["width", "height", "x", "y"]) {
            svgElement.removeAttribute(key);
          }
          svgElement.id = id;
          container.appendChild(svgElement);
        }
      }).catch(() => svgIconList.delete(id));
    }
  }, [props.name]);
  return (
    <svg>
      <use href={eId} />
    </svg>
  );
}
