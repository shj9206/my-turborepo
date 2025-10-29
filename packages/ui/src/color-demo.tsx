import { colors } from "./colors";

export function ColorDemo() {
  const colorEntries = Object.entries(colors);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Tailwind 커스텀 컬러 팔레트</h1>

      <div className="space-y-8">
        {colorEntries.map(([colorName, shades]) => (
          <div key={colorName} className="space-y-2">
            <h2 className="text-2xl font-semibold capitalize mb-4">
              {colorName}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2">
              {Object.entries(shades).map(([shade, value]) => (
                <div key={shade} className="space-y-1">
                  <div
                    className="h-20 rounded-lg shadow-md border border-gray-200"
                    style={{ backgroundColor: value }}
                  />
                  <div className="text-sm text-center">
                    <div className="font-semibold">{shade}</div>
                    <div className="text-xs text-gray-600">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-blue-10 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">사용 방법</h3>
        <div className="space-y-2 font-mono text-sm">
          <div className="bg-white p-3 rounded">
            <span className="text-gray-600">{`// 배경색`}</span>
            <br />
            <span className="text-blue-60">&lt;div</span>{" "}
            <span className="text-purple-60">className</span>=
            <span className="text-green-60">&quot;bg-red-50&quot;</span>
            <span className="text-blue-60">&gt;...&lt;/div&gt;</span>
          </div>
          <div className="bg-white p-3 rounded">
            <span className="text-gray-600">{`// 텍스트 색`}</span>
            <br />
            <span className="text-blue-60">&lt;p</span>{" "}
            <span className="text-purple-60">className</span>=
            <span className="text-green-60">&quot;text-purple-70&quot;</span>
            <span className="text-blue-60">&gt;...&lt;/p&gt;</span>
          </div>
          <div className="bg-white p-3 rounded">
            <span className="text-gray-600">{`// 테두리 색`}</span>
            <br />
            <span className="text-blue-60">&lt;button</span>{" "}
            <span className="text-purple-60">className</span>=
            <span className="text-green-60">&quot;border-green-40&quot;</span>
            <span className="text-blue-60">&gt;...&lt;/button&gt;</span>
          </div>
        </div>
      </div>
    </div>
  );
}
