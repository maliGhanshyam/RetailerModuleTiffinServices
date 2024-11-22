// PieChartWithLabels.tsx
import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

type DataEntry = {
  name: string;
  value: number;
};

type PieChartWithLabelsProps = {
  data: DataEntry[];
  colors: string[];
  width?: number;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
};

const PieChartWithLabels: React.FC<PieChartWithLabelsProps> = ({
  data,
  colors,
  width = 400,
  height = 400,
  innerRadius = 60,
  outerRadius = 80,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <PieChart width={width} height={height}>
        <Pie
          data={data}
          cx={width / 2}
          cy={height / 2}
          innerRadius={innerRadius}
          outerRadius={hoverIndex !== null ? outerRadius + 3 : outerRadius}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          onMouseEnter={(_, index) => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend layout="vertical" align="right" verticalAlign="middle" />
      </PieChart>

      <div>
        {data.map((entry, index) => (
          <div
            key={`label-${index}`}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                backgroundColor: colors[index % colors.length],
                marginRight: 10,
              }}
            ></div>
            <span>{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartWithLabels;
