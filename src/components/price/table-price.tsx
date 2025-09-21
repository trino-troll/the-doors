import { fetchFilteredPrice } from "@/app/price/action";
import { DeletePrice } from "./delite-price";
import { EditPrice } from "./edit-price";
import clsx from "clsx";

export async function TablePrice({ query }: { query: string }) {
  const prices = await fetchFilteredPrice({ query });
  return (
    <table>
      <tbody className="border-2">
        {prices && prices.length > 0 ? (
          prices.map((price, i) => (
            <tr
              className={clsx("border", {
                "bg-gray-100": (i + 1) % 2 === 0,
                "bg-gray-200": (i + 1) % 2 === 1,
              })}
              key={price.id}
            >
              <td className="px-2 border-r">{price.name}</td>
              <td className="px-2 border-r">{price.price}</td>
              <td className="px-2 py-1 border-r">
                <EditPrice price={price} />
              </td>
              <td className="px-2 py-1">
                <DeletePrice id={price.id} name={price.name} />
              </td>
            </tr>
          ))
        ) : (
          <tr className="px-2 border-r">
            <td>Пока нет записей</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
