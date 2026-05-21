import { H1 } from '@/shared/h1';
import { getInfoIncommingDoor } from '../../actions';
import clsx from 'clsx';
import { EditDoorInfo } from '@/components/info-incomming-door/edit-door-info';

export default async function IncommingInfoDoorPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const info = await getInfoIncommingDoor({ id });

    if (!info) {
        return <p className="text-center">Нет информации о двери</p>;
    }
    return (
        <section>
            <div className="flex justify-between items-center mb-2">
                <H1 className="m-0!">{info.name}</H1>
                <div className="text-xl md:text-2xl lg:text-3xl font-semibold">
                    {info.price}
                </div>
                <EditDoorInfo door={info} />
            </div>
            <table className="w-full md:w-auto">
                <thead className="border border-black">
                    <tr>
                        <th className="border border-black">Параметр</th>
                        <th>Значение</th>
                    </tr>
                </thead>
                <tbody className="border border-black">
                    <tr className="bg-gray-200">
                        <td className="px-2 border-r border-black">Фабрика</td>
                        <td className="px-2">{info.factory}</td>
                    </tr>
                    <tr>
                        <td className="px-2 border-r border-black">Доставка</td>
                        <td className="px-2">{info.delivery}</td>
                    </tr>
                    <tr className="bg-gray-200">
                        <td className="px-2 border-r border-black">
                            Внутренняя панель
                        </td>
                        <td className="px-2">{info.innerPanel}</td>
                    </tr>
                    <tr>
                        <td className="px-2 border-r border-black">Зеркало</td>
                        <td
                            className={clsx('px-2 font-semibold', {
                                'text-red-500': !info.mirror,
                                'text-green-500': info.mirror,
                            })}
                        >
                            {info.mirror ? 'Да' : 'Нет'}
                        </td>
                    </tr>
                    <tr className="bg-gray-200">
                        <td className="px-2 border-r border-black">
                            Внешняя панель
                        </td>
                        <td className="px-2">{info.externalPanel}</td>
                    </tr>
                    <tr>
                        <td className="px-2 border-r border-black">
                            Штамповка
                        </td>
                        <td
                            className={clsx('px-2 font-semibold', {
                                'text-red-500': !info.stamp,
                                'text-green-500': info.stamp,
                            })}
                        >
                            {info.stamp ? 'Да' : 'Нет'}
                        </td>
                    </tr>
                    <tr className="bg-gray-200">
                        <td className="px-2 border-r border-black">
                            Толщина полотна
                        </td>
                        <td className="px-2">{info.thicknessCanvas}</td>
                    </tr>
                    <tr>
                        <td className="px-2 border-r border-black">
                            Толщина коробки
                        </td>
                        <td className="px-2">{info.thicknessBox}</td>
                    </tr>
                    <tr className="bg-gray-200">
                        <td className="px-2 border-r border-black">
                            Тип короба
                        </td>
                        <td
                            className={clsx('px-2 font-semibold', {
                                'text-red-500': !info.typeBox,
                                'text-green-500': info.typeBox,
                            })}
                        >
                            {info.typeBox ? 'Закрытый' : 'Открытый'}
                        </td>
                    </tr>
                    <tr>
                        <td className="px-2 border-r border-black">
                            Толщина металла
                        </td>
                        <td className="px-2">{info.metalThickness}</td>
                    </tr>
                    <tr className="bg-gray-200">
                        <td className="px-2 border-r border-black">Покрытие</td>
                        <td className="px-2">{info.coverage}</td>
                    </tr>
                    <tr>
                        <td className="px-2 border-r border-black">
                            Цвет покрытия
                        </td>
                        <td className="px-2">{info.color}</td>
                    </tr>
                    <tr className="bg-gray-200">
                        <td className="px-2 border-r border-black">
                            Контура уплотнения
                        </td>
                        <td className="px-2">{info.purging}</td>
                    </tr>
                    <tr>
                        <td className="px-2 border-r border-black">Глазок</td>
                        <td
                            className={clsx('px-2 font-semibold', {
                                'text-red-500': !info.typeBox,
                                'text-green-500': info.typeBox,
                            })}
                        >
                            {info.peephole ? 'Есть' : 'Нет'}
                        </td>
                    </tr>
                    <tr className="bg-gray-200">
                        <td className="px-2 border-r border-black">
                            Основной замок
                        </td>
                        <td className="px-2">{info.mainLock}</td>
                    </tr>
                    <tr>
                        <td className="px-2 border-r border-black">
                            Модель основного замка
                        </td>
                        <td className="px-2">{info.mainNameLock}</td>
                    </tr>
                    <tr className="bg-gray-200">
                        <td className="px-2 border-r border-black">
                            Дополнительный замок
                        </td>
                        <td className="px-2">{info.additionalLock}</td>
                    </tr>
                    <tr>
                        <td className="px-2 border-r border-black">
                            Модель дополнительного замка
                        </td>
                        <td className="px-2">{info.additionalNameLock}</td>
                    </tr>
                    <tr className="bg-gray-200">
                        <td className="px-2 border-r border-black">
                            Ночная задвижка
                        </td>
                        <td
                            className={clsx('px-2 font-semibold', {
                                'text-red-500': !info.nightLatch,
                                'text-green-500': info.nightLatch,
                            })}
                        >
                            {info.nightLatch ? 'Есть' : 'Нет'}
                        </td>
                    </tr>
                    <tr>
                        <td className="px-2 border-r border-black">
                            Внутреннее наполнение
                        </td>
                        <td className="px-2">{info.internalFilling}</td>
                    </tr>
                    <tr className="bg-gray-200">
                        <td className="px-2 border-r border-black">
                            Регулировка прижима
                        </td>
                        <td
                            className={clsx('px-2 font-semibold', {
                                'text-red-500': !info.adjustingСlamp,
                                'text-green-500': info.adjustingСlamp,
                            })}
                        >
                            {info.adjustingСlamp ? 'Есть' : 'Нет'}
                        </td>
                    </tr>
                    <tr>
                        <td className="px-2 border-r border-black">
                            Противосъемные штыри
                        </td>
                        <td
                            className={clsx('px-2 font-semibold', {
                                'text-red-500': !info.antiRemovablePins,
                                'text-green-500': info.antiRemovablePins,
                            })}
                        >
                            {info.antiRemovablePins ? 'Есть' : 'Нет'}
                        </td>
                    </tr>
                    <tr className="bg-gray-200">
                        <td className="px-2 border-r border-black">
                            Порог из нержавейки
                        </td>
                        <td
                            className={clsx('px-2 font-semibold', {
                                'text-red-500': !info.antiRemovablePins,
                                'text-green-500': info.antiRemovablePins,
                            })}
                        >
                            {info.stainlessThreshold ? 'Есть' : 'Нет'}
                        </td>
                    </tr>
                    <tr>
                        <td className="px-2 border-r border-black">
                            Кол-во петель
                        </td>
                        <td className="px-2">{info.loops}</td>
                    </tr>
                    <tr className="bg-gray-200">
                        <td className="px-2 border-r border-black">Упаковка</td>
                        <td className="px-2">{info.packaging}</td>
                    </tr>
                    <tr>
                        <td className="px-2 border-r border-black">
                            Терморазрыв
                        </td>
                        <td
                            className={clsx('px-2 font-semibold', {
                                'text-red-500': !info.antiRemovablePins,
                                'text-green-500': info.antiRemovablePins,
                            })}
                        >
                            {info.thermalRupture ? 'Есть' : 'Нет'}
                        </td>
                    </tr>
                </tbody>
            </table>

            <div>Нужно добавить таблицу аналогов</div>
        </section>
    );
}
