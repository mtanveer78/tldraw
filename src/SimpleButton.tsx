import React, { useState, useRef, useEffect } from 'react';

interface Frame {
  id: number;
  title: string;
  dimensions: { width: number; height: number } | null;
  position: { top: number; left: number } | null;
}

const SimpleButton: React.FC = () => {
  const [frames, setFrames] = useState<Frame[]>([]);
  const frameRef = useRef<HTMLDivElement>(null);

  const addFrame = () => {
    const newFrame: Frame = { id: frames.length + 1, title: `Frame ${frames.length + 1}`, dimensions: null, position: null };
    setFrames([...frames, newFrame]);
  };

  useEffect(() => {
    const updateFrameDimensions = () => {
      if (frameRef.current) {
        const frameDimensions = frameRef.current.getBoundingClientRect();
        const framePosition = { top: frameDimensions.top + window.scrollY, left: frameDimensions.left + window.scrollX };
        const updatedFrames = frames.map((frame) => {
          if (frame.id === frames.length) {
            return {
              ...frame,
              dimensions: {
                width: frameDimensions.width,
                height: frameDimensions.height,
              },
              position: framePosition,
            };
          }
          return frame;
        });
        setFrames(updatedFrames);
      }
    };

    updateFrameDimensions();
  }, [frames]);

  return (
    <div>
      <div style={{ position: 'absolute', zIndex: 300, top: 100, left: 30 }}>
        <button onClick={addFrame}>Add Frame</button>
      </div>
      <div style={{ position: 'absolute', zIndex: 300, top: 200, left: 100 }}>
        {frames.map((frame) => (
          <div
            key={frame.id}
            ref={frame.id === frames.length ? frameRef : null}
            style={{
              backgroundColor: 'lightgreen',
              width: '400px',
              height: '400px',
              textAlign: 'center',
              minWidth: '80px',
              float: 'left',
              margin: '30px',
              borderRadius: '5px',
              border: '1px solid black',
            }}
          >
            {`${frame.title}, ${frame.dimensions?.height}, ${frame.dimensions?.width}, ${frame.position?.top}, ${frame.position?.left}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleButton;
