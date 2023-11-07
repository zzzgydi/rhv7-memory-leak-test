import { useRef, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { uuid } from "./utils";
import { Markdown } from "./Markdown";

const EPOCH_TIME = 200;

interface ChatItem {
  id: string;
  content: string;
}

export function App() {
  const [items, setItems] = useState<ChatItem[]>([]);
  const [loading, setLoading] = useState(false);

  const timeRef = useRef<any>();

  const handleBegin = () => {
    if (timeRef.current) return;

    setLoading(true);

    function addMessage() {
      const id = uuid();
      const content = `This is message ${id}`;
      setItems((items) => [...items, { id, content }]);
      timeRef.current = setTimeout(addMessage, EPOCH_TIME);
    }

    addMessage();
  };

  const handleEnd = () => {
    setLoading(false);
    clearTimeout(timeRef.current);
    timeRef.current = null;
  };

  const handleClear = () => setItems([]);

  return (
    <div className="flex flex-col gap-4 h-screen bg-zinc-300 p-4">
      <ScrollToBottom className="flex-auto overflow-auto h-full rounded bg-white">
        <div className="flex flex-col h-full p-4 gap-4">
          {items.map((item, index) => (
            <div key={item.id} className="bg-blue-200 py-2 px-4 rounded">
              <div>Index: {index}</div>
              <Markdown>{item.content}</Markdown>
            </div>
          ))}
        </div>
      </ScrollToBottom>

      <div className="flex-none h-10 flex items-center gap-4 justify-center">
        {loading ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleEnd}
          >
            Stop
          </button>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleBegin}
          >
            Start
          </button>
        )}

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
