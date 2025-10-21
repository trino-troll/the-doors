import { arrPDKEcoshpon } from '@/app/data/ecoshpon-pdk';
import { Card } from '@/components/info/card';

export default function InfoPage() {
    return (
        <section className="pb-8">
            <h1 className="mb-4">Справочная информация из прайса</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                {arrPDKEcoshpon.map((door) => (
                    <Card door={door} key={door.model} />
                ))}
            </div>
        </section>
    );
}
