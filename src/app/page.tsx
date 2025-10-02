import { CheckGptConnection } from '@/components/home/check-gpt-connection';

export default function MainPage() {
    return (
        <section>
            <div>
                <h2 className="text-center text-lg lg:text-3xl font-semibold">
                    Спавочник продавца
                </h2>
                <CheckGptConnection />
            </div>
            <div className="rounded-lg lg:rounded-3xl border-2 border-blue-600">
                <h2 className="text-white font-semibold rounded-t-lg lg:rounded-t-3xl text-xl bg-blue-600  text-center py-2">
                    ВАЖНО!!!
                </h2>

                <div className="text-center p-4">
                    <p className="font-semibold">Друзья!</p>
                    <p>
                        Обновил данные по металлкам и частично учел
                        межкомнотные.
                    </p>
                    <p>Будьте внимательны и не щёлкайте много раз на кнопки.</p>
                    <p>
                        Сайт крутится у меня на компе, а доступ к нему
                        происходит через пендосовкую программу с впн.
                    </p>
                    <p className="text-orange-600 mt-2">ПОЖАЛУЙСТА!!!</p>
                    <p>
                        Если что-то продали, позвоните мне - я подпишу на складе
                    </p>
                    <p>
                        После подтверждениия от меня уменьшите позицию на нужное
                        количество
                    </p>
                    <p className="text-orange-600 mt-2">ДОЖДИСЬ ИЗМЕНЕНИЙ!!!</p>
                    <p className="text-orange-600">
                        ПРОВЕРЬ ЧТО ИЗМЕНЕНИЯ ПРОИЗОШЛИ!!!
                    </p>
                    <p>
                        Если не произошли изменения - позвони мне и я постараюсь
                        вам помочь.
                    </p>
                    <p>
                        Ной номер для связи -{' '}
                        <a
                            href="tel:+79302881311"
                            className="text-blue-600 font-semibold"
                        >
                            ПОЗВОНИТЬ
                        </a>
                    </p>
                    <p className="my-4 text-lg font-semibold">
                        Помогите мне сделать удобный инструмент
                    </p>
                </div>
                <p className="text-white font-semibold bg-blue-600 text-center py-2 rounded-b-lg lg:rounded-b-3xl">
                    РАБОТА САЙТА МОЖЕТ ПОДВИСАТЬ
                </p>
            </div>
        </section>
    );
}
