import { getOrderBN } from '@/app/(public)/ordersBN/actions';
import clsx from 'clsx';
import EditOrderBN from './edit-orderBN';
import { DeleteOrderBN } from './delite-orderBN';

export async function ListOrderBN() {
    const orderBN = await getOrderBN();
    return (
        <div className="overflow-x-auto mt-4">
            <table className="min-w-full  border text-sm">
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
                    {orderBN && orderBN.length > 0 ? (
                        orderBN.map((order, i) => (
                            <tr
                                key={order.id}
                                className={clsx('border', {
                                    'bg-gray-100': (i + 1) % 2 === 0,
                                })}
                            >
                                <td className="p-2 border-r">{i + 1}</td>
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
