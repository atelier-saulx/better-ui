import { useEffect, useState, MutableRefObject } from 'react';

export type MouseCoordinates = {
  x: number | null,
  y: number | null
}

export type ClickCoordinates = MouseCoordinates & {
  timestamp: number
}

export type TrackingArea = MouseCoordinates & {
  width: number | null,
  height: number | null
}

type HookResponse = {
  tracking: boolean;
  mousePosition: MouseCoordinates;
  clickEvent: ClickCoordinates;
  trackingArea: TrackingArea;
};

export const useTrackMouse = (element: MutableRefObject<HTMLElement | null>): HookResponse => {
  const [tracking, setTracking] = useState(false);
  const [mousePosition, setMousePosition] = useState<MouseCoordinates>({ x: 0, y: 0 });
  const [clickEvent, setClickEvent] = useState<ClickCoordinates>({ x: 0, y: 0, timestamp: 0 });
  const [trackingArea, setTrackingArea] = useState<TrackingArea>({ x: 0, y: 0, width: 0, height: 0 });

  const getRect = (element: HTMLElement) => element.getBoundingClientRect()

  const handleMouseMove = (event: MouseEvent) => {
    if (element.current) {
      const rect = getRect(element.current);
      setTracking(true)
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    }
  };

  const handleMouseEnter = () => setTracking(true);
  const handleMouseLeave = () => setTracking(false);

  const handleClick = (event: MouseEvent) => {
    if (element.current) {
      const rect = getRect(element.current);
      setClickEvent({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        timestamp: Date.now()
      });
    }
  };

  const updateTrackingArea = () => {
    if (element.current) {
      const rect = getRect(element.current);
      setTracking(false)
      setTrackingArea({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
      });
    }
  };

  useEffect(() => {
    if (element.current) {
      element.current.addEventListener('mousemove', handleMouseMove);
      element.current.addEventListener('mouseenter', handleMouseEnter);
      element.current.addEventListener('mouseleave', handleMouseLeave);
      element.current.addEventListener('click', handleClick);
      window.addEventListener('scroll', updateTrackingArea);
      window.addEventListener('DOMMouseScroll', () => setTracking(false));
      window.addEventListener('resize', updateTrackingArea);

      updateTrackingArea();
    }

    return () => {
      if (element.current) {
        element.current.removeEventListener('mousemove', handleMouseMove);
        element.current.removeEventListener('mouseenter', handleMouseEnter);
        element.current.removeEventListener('mouseleave', handleMouseLeave);
        element.current.removeEventListener('click', handleClick);
      }

      window.removeEventListener('scroll', updateTrackingArea);
      window.removeEventListener('DOMMouseScroll', () => setTracking(false));
      window.removeEventListener('resize', updateTrackingArea);
    };
  }, [element]);

  return { tracking, mousePosition, clickEvent, trackingArea }
}