import "./index.scss";

import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { useToggle } from "react-use";

import { OverlayPosition } from "~/types";

export default function Dropdown({
  trigger,
  children,
  position,
}: {
  trigger: JSX.Element | string;
  children: JSX.Element;
  position: OverlayPosition;
}) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [show, toggleShow] = useToggle(false);
  const [showing, toggleShowing] = useToggle(false);

  const clickListener = (e: MouseEvent) => {
    const inner = innerRef.current;
    let el = e.target as HTMLElement | null;
    while (el) {
      if (el === inner) {
        return;
      }
      el = el.parentElement;
    }
    // hide dropdown
    document.removeEventListener("click", clickListener);
    toggleShow();
  };

  const onEntered = () => {
    document.addEventListener("click", clickListener);
  };

  return (
    <div className="relative inline-flex">
      <button onClick={() => !showing && toggleShow()}>{trigger}</button>
      <CSSTransition
        nodeRef={innerRef}
        in={show}
        addEndListener={(done: () => void) =>
          innerRef.current!.addEventListener("transitionend", done, false)
        }
        onEnter={() => toggleShowing()}
        onEntered={onEntered}
        onExited={() => toggleShowing()}
        classNames="dropdown"
      >
        <div ref={innerRef} className={`dropdown-inner absolute ${position.join(" ")}`}>
          {children}
        </div>
      </CSSTransition>
    </div>
  );
}
