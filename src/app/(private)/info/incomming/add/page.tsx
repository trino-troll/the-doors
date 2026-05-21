'use client';
import { Button } from '@/shared/button';
import { H1 } from '@/shared/h1';
import { Input } from '@/shared/input';
import { useState } from 'react';
import { createNewInfoIncDoor } from '../../actions';

export default function AddInfoIncommingDoor() {
    const [nameDoor, setNameDoor] = useState<string>('');

    function createNewInfoInc() {
        setNameDoor('');
    }
    return (
        <section>
            <H1>Страница добавления новой двери</H1>
            <form
                action={() => createNewInfoIncDoor({ name: nameDoor })}
                className="w-80 p-4 flex flex-col gap-4 border border-green-400 rounded-2xl"
                onSubmit={createNewInfoInc}
            >
                <Input
                    placeholder="Название двери"
                    value={nameDoor}
                    onChange={(e) => setNameDoor(e.target.value)}
                />
                <Button>Создать</Button>
            </form>
        </section>
    );
}
