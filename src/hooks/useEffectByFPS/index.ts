import {useEffect, useRef} from "react";

export const useEffectByFPS = (callback: () => void, dependencies: any, fps: number) => {
  const frame = useRef<number>(0);
  const savedCallback = useRef(callback);
  const lastExecutionTime = useRef(Date.now());
  const dependenciesRef = useRef(dependencies);
  const fpsInterval = 1000 / fps;

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback, fps]);

  useEffect(() => {
    function tick() {
      const currentDependencies = JSON.stringify(dependenciesRef.current);
      const newDependencies = JSON.stringify(dependencies);

      if (Date.now() - lastExecutionTime.current >= fpsInterval) {
        savedCallback.current();
        lastExecutionTime.current = Date.now();
      } else if (currentDependencies !== newDependencies) {
        frame.current = requestAnimationFrame(tick);
      }
    }

    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [...dependencies]);
}



// export const useEffectByFPS = (callback: () => void, dependencies: any, fps: number) => {
//   const frame = useRef<number>(0);
//   const lastFrameTime = useRef<number>(performance.now());
//   const actualFrameTime = useRef<number>(performance.now());
//   const elapsedTime = useRef<number>(actualFrameTime.current - lastFrameTime.current);
//   const dependenciesRef = useRef(dependencies);
//   const fpsInterval = 1000 / fps;
//   const [trigger, setTrigger] = useState<boolean>(false); // state to trigger the effect
//
//   const animate = async () => {
//     const currentDependencies = JSON.stringify(dependenciesRef.current);
//     const newDependencies = JSON.stringify(dependencies);
//
//     if (currentDependencies !== newDependencies && trigger) {
//       lastFrameTime.current = actualFrameTime.current - (elapsedTime.current % fpsInterval);
//       callback();
//       setTrigger(false)
//     }
//
//     if (elapsedTime.current > fpsInterval) {
//       frame.current = requestAnimationFrame(animate);
//     }
//   };
//
//   useEffect(() => {
//     actualFrameTime.current = performance.now();
//     elapsedTime.current =  actualFrameTime.current - lastFrameTime.current;
//
//
//       console.log(dependencies)
//       setTrigger(true);
//   }, dependencies);
//
//   useEffect(() => {
//     frame.current = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(frame.current);
//   }, [trigger, fps, callback]); // re-run the effect when the trigger changes
// };







// export const useEffectByFPS = (callback: () => void, dependencies: any, fps: number) => {
//   const frame = useRef<number>(0);
//   const lastFrameTime = useRef<number>(performance.now());
//   const dependenciesRef = useRef(dependencies);
//   const currentDependencies = JSON.stringify(dependenciesRef.current);
//   const newDependencies = JSON.stringify(dependencies);
//   const fpsInterval = 1000 / fps;
//
//   const animate = async () => {
//     const now: number = performance.now();
//     const elapsed: number = now - lastFrameTime.current;
//
//     if (elapsed > fpsInterval && currentDependencies !== newDependencies) {
//       lastFrameTime.current = now;
//       callback();
//     }
//   };
//
//   useEffect(() => {
//     if (currentDependencies !== newDependencies) {
//       frame.current = requestAnimationFrame(animate);
//     }
//
//     return () => {
//       if (!frame.current) {
//         return
//       }
//
//       return cancelAnimationFrame(frame.current)
//     }
//   }, [...dependencies, fps, callback]);
// };