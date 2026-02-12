import { getIpUsers } from '@/app/(private)/for-good/actions';
import clsx from 'clsx';
import { BlockedBtn } from './blocked-btn';
import { EditNameIp } from './editNameIp';

export async function ListBlocked() {
    const ipUsers = await getIpUsers();

    return (
        <section className="mt-4">
            <h2 className="font-semibold">Список блокировок</h2>
            <div className="w-full overflow-x-auto text-sm lg:text-[18px]">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="border">ip</th>
                            <th className="border">Действие</th>
                            <th className="border px-1">Имя</th>
                            <th className="border px-1">Попыток</th>
                            <th className="border px-1">Блок</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ipUsers.map((ip) => (
                            <tr
                                key={ip.id}
                                className={clsx({
                                    'bg-red-300': ip.count > 5,
                                })}
                            >
                                <td className="px-2 border">{ip.ip}</td>
                                <td className="px-2 border">{ip.action}</td>
                                <td className="px-2 border flex gap-2">
                                    {ip.client_name}
                                    <EditNameIp
                                        name={ip.client_name}
                                        ip={ip.ip}
                                    />
                                </td>
                                <td className="px-2 border text-center">
                                    {ip.count}
                                </td>
                                <td className="p-1 border">
                                    <BlockedBtn
                                        ip={ip.ip}
                                        manual={ip.manual_locking}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
