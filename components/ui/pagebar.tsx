import { Tabs, TabsList, TabsTrigger } from './tabs';
import { Text } from './text';

export default function PageBar({
  maxValue,
  onChange,
  value,
}: {
  maxValue: number;
  onChange: (value: number) => void;
  value: number;
}) {
  if (maxValue <= 5) {
    return (
      <Tabs value={value.toString()} onValueChange={(v) => onChange(+v)}>
        <TabsList>
          {new Array(maxValue).fill(0).map((_, index) => (
            <TabsTrigger key={index} value={index.toString()}>
              <Text>{index + 1}</Text>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    );
  }
  if (maxValue - value <= 2 || value <= 1) {
    return (
      <Tabs value={value.toString()} onValueChange={(v) => onChange(+v)}>
        <TabsList>
          <TabsTrigger value="0">
            <Text>1</Text>
          </TabsTrigger>
          <TabsTrigger value="1">
            <Text>2</Text>
          </TabsTrigger>
          <Text>...</Text>
          <TabsTrigger value={(maxValue - 2).toString()}>
            <Text>{maxValue - 1}</Text>
          </TabsTrigger>
          <TabsTrigger value={(maxValue - 1).toString()}>
            <Text>{maxValue}</Text>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    );
  }
  return (
    <Tabs value={value.toString()} onValueChange={(v) => onChange(+v)}>
      <TabsList>
        <TabsTrigger value="0">
          <Text>1</Text>
        </TabsTrigger>
        <TabsTrigger value="1">
          <Text>2</Text>
        </TabsTrigger>
        {value > 2 && <Text>...</Text>}
        {value > 3 && (
          <TabsTrigger value={(value - 1).toString()}>
            <Text>{value}</Text>
          </TabsTrigger>
        )}
        <TabsTrigger value={value.toString()}>
          <Text>{value + 1}</Text>
        </TabsTrigger>
        {value < maxValue - 3 && (
          <TabsTrigger value={(value + 1).toString()}>
            <Text>{value + 2}</Text>
          </TabsTrigger>
        )}
        {maxValue - value > 4 && <Text>...</Text>}
        <TabsTrigger value={(maxValue - 2).toString()}>
          <Text>{maxValue - 1}</Text>
        </TabsTrigger>
        <TabsTrigger value={(maxValue - 1).toString()}>
          <Text>{maxValue}</Text>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
