import { EcoshponPDK } from '@/shared/type';
import { DetailsButton } from './details-button';
import { CardImage } from './card-image';

export function Card({ door }: { door: EcoshponPDK }) {
    return (
        <div className="flex flex-col bg-blue-50 rounded-xl border">
            {door.image && <CardImage imageName={door.image} />}

            <div className="p-2 text-xs md:text-sm rounded-b-lg flex flex-col flex-1">
                <div className="flex-1 ">
                    <div className="flex justify-between font-semibold">
                        <h2>{door.model}</h2>
                        <div>
                            {+door.price_opt + (+door.price_opt * 45) / 100}
                        </div>
                        <div>{door.coating}</div>
                    </div>
                    <div>{door.custom_sizes}</div>
                </div>
                <DetailsButton door={door} />
            </div>
        </div>
    );
}
