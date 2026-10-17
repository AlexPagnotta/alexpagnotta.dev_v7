import * as React from "react";
import { useMediaQuery } from "usehooks-ts";
import { CARD_SELECTOR } from "@/app/features/home-page/feed/card-cursor/card-selector";
import { screens } from "@/app/features/utils/screens";
import { onScrollFrame } from "@/app/features/utils/scroll";

// A touch phone has no hover, so the card crossing the middle of the viewport gets it instead.
const CENTRED_CARD_QUERY = `(pointer: coarse) and (width < ${screens.md})`;

// How long a card has to hold the middle: a flick past never lights it up, and crossing a gap never drops the last one.
const CENTRED_DWELL = 150;

/** On touch phones, sets `data-active` on the revealed card inside `rootRef` that holds the middle of the viewport. */
export const useCentredCard = (rootRef: React.RefObject<HTMLElement | null>) => {
  const flagsCentredCard = useMediaQuery(CENTRED_CARD_QUERY, { initializeWithValue: false });

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root || !flagsCentredCard) return;

    let active: Element | null = null;
    let candidate: Element | null = null;
    let dwellTimeout: ReturnType<typeof setTimeout> | undefined;

    const look = () => {
      const card = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)?.closest(CARD_SELECTOR);
      // Waits out the reveal, or the hover plays on top of the card still rising in.
      const next = card && root.contains(card) && card.closest("[data-revealed]") ? card : null;
      if (next === candidate) return;

      candidate = next;
      clearTimeout(dwellTimeout);
      if (candidate === active) return;
      dwellTimeout = setTimeout(() => {
        active?.removeAttribute("data-active");
        active = candidate;
        active?.setAttribute("data-active", "");
      }, CENTRED_DWELL);
    };

    const frames = onScrollFrame(look, { resize: true });
    // Filtering and a reveal finishing change the candidate without a scroll.
    const mutation = new MutationObserver(frames.schedule);
    mutation.observe(root, { childList: true, subtree: true, attributeFilter: ["data-revealed"] });
    frames.schedule();

    return () => {
      mutation.disconnect();
      frames.stop();
      clearTimeout(dwellTimeout);
      active?.removeAttribute("data-active");
    };
  }, [rootRef, flagsCentredCard]);
};
