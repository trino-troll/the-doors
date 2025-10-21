import clsx from 'clsx';
import EditOrderBN from './edit-orderBN';
import { DeleteOrderBN } from './delite-orderBN';
import { OrderBN } from '@/shared/type';

export async function ListOrderBN({ list }: { list: OrderBN[] }) {
    return (
        <div className="overflow-x-auto mt-4">
            <table className="border text-sm">
                <thead>
                    <tr className="border">
                        <th className="p-2 border-r">№</th>
                        <th className="p-2 border-r">Название</th>
                        <th className="p-2 border-r">Номер счета</th>
                        <th className="p-2 border-r">В 1С</th>
                        <th className="p-2 border">Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {list && list.length > 0 ? (
                        list.map((order, i) => (
                            <tr
                                key={order.id}
                                className={clsx('border', {
                                    'bg-gray-100': (i + 1) % 2 === 0,
                                })}
                            >
                                <td className="p-2 border-r text-center">
                                    {i + 1}
                                </td>
                                <td className="p-2 border-r">{order.name}</td>
                                <td className="p-2 border-r">
                                    {order.orderNumber}
                                </td>
                                <td
                                    className={clsx(
                                        'whitespace-nowrap p-2 border-r',
                                        {
                                            'bg-red-200': !order.in1C,
                                            'bg-green-200': order.in1C,
                                        }
                                    )}
                                >
                                    {order.in1C ? 'Занесено' : 'Не занесено'}
                                </td>
                                <td className="px-2 flex py-1 gap-2 items-center">
                                    <EditOrderBN orderBN={order} />
                                    <DeleteOrderBN
                                        id={order.id}
                                        name={order.name}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td>Пока нет записетй</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
