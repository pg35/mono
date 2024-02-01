import { useState } from "react";

interface Config {
  enable: boolean;
  type: "discount" | "surcharge" | "";
  valueType: "fixed" | "percent";
  value: number | "";
}
interface CoreRoles {
  "*": Config;
  guest: Config;
}
interface UserRoles {
  [role: string]: Config;
}
type State = [CoreRoles, UserRoles];
const defaultConfig: Config = {
  enable: false,
  type: "",
  valueType: "fixed",
  value: "",
};
const initialState: State = [
  {
    "*": defaultConfig,
    guest: defaultConfig,
  },
  {
    abc: defaultConfig,
    x23: defaultConfig,
  },
];
type RowProps = {
  role: string;
  config: Config;
  onChange: (role: string, name: string, value: string | boolean) => void;
};
function formatFloat(value: number | string) {
  const n = Number(value);
  return !isNaN(n) ? n.toFixed(2) : "0.00";
}
function Row({ role, config, onChange }: RowProps) {
  //console.log("config", role, config.value);
  return (
    <tr>
      <td className="text-left px-4 py-2">
        <input
          type="checkbox"
          name="enable"
          value="1"
          className="h-5 w-5 rounded border-gray-300 "
          checked={config.enable}
          onChange={(e) => onChange(role, "enable", e.target.checked)}
        />
      </td>
      <td className="first-letter:uppercase text-left whitespace-nowrap px-4 py-2 text-gray-700">
        {"*" === role ? "All users" : role}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        <select
          name="type"
          value={config.type}
          className="w-full"
          onChange={(e) => onChange(role, "type", e.target.value)}
        >
          <option value="">Do not change</option>
          <option value="discount">Discrease</option>
          <option value="surcharge">Increase</option>
        </select>
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        <select
          name="valueType"
          value={config.valueType}
          className="w-full"
          onChange={(e) => onChange(role, "valueType", e.target.value)}
        >
          <option value="fixed">Fixed</option>
          <option value="percent">Percent</option>
        </select>
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        <input
          type="number"
          name="value"
          min="0"
          step={0.1}
          value={config.value}
          className="w-full"
          onChange={(e) => onChange(role, "value", e.target.value)}
          placeholder="0.00"
          onBlur={(e) => {
            onChange(role, "value", formatFloat(e.target.value));
          }}
        />
      </td>
    </tr>
  );
}

export default function App() {
  const [state, setState] = useState<State>(initialState);
  function handleChange(role: string, name: string, value: string | boolean) {
    console.log(role, name, value);
    const newState: State = [{ ...state[0] }, { ...state[1] }];
    let newConfig = Object.keys(newState[0])
      .filter((x) => x === role)
      .map((x) => newState[0][x as keyof CoreRoles]);
    if (newConfig.length) {
      newState[0][role as keyof CoreRoles] = { ...newConfig[0], [name]: value };
    } else {
      newConfig = Object.keys(newState[1])
        .filter((x) => x === role)
        .map((x) => newState[1][x as keyof UserRoles]);
      newState[1][role as keyof UserRoles] = { ...newConfig[0], [name]: value };
    }
    console.log(state, newState, state[0]["*"] === newState[0]["*"]);
    setState(newState);
  }
  //return <h1 className="text-3xl font-bold underline">ehllsw</h1>;
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="border-collapse w-auto">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="text-left whitespace-nowrap px-4 py-2 font-medium border border-solid border-white">
                Enable
              </th>
              <th className="text-left whitespace-nowrap px-4 py-2 font-medium border border-solid border-white">
                Role
              </th>
              <th className="text-left whitespace-nowrap px-4 py-2 font-medium border border-solid border-white">
                Price change action
              </th>
              <th className="text-left whitespace-nowrap px-4 py-2 font-medium border border-solid border-white">
                Price change type
              </th>
              <th className="text-left whitespace-nowrap px-4 py-2 font-medium border border-solid border-white">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(state[0]).map((x) => {
              const config = state[0][x as keyof CoreRoles];
              return (
                <Row key={x} role={x} config={config} onChange={handleChange} />
              );
            })}
            {Object.keys(state[1]).map((x) => {
              const config = state[1][x as keyof UserRoles];
              return (
                <Row key={x} role={x} config={config} onChange={handleChange} />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="text-left mt-8">
        <button onClick={() => {}}>Save</button>
      </div>
    </div>
  );
}