import { getDoor } from "@/app/actions";
import { EditDoor } from "@/components/one-incomming-door/edit-door";

export default async function IncommingDoorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const door = await getDoor({ id });
  console.log(door);

  if (!door) return <div className="text-center mt-8">Дверь не найдена</div>;

  return (
    <div>
      <div className="flex gap-4 items-center">
        <h2 className="font-semibold text-lg lg:text2xl">{door.name}</h2>
        <EditDoor door={door} />
      </div>
      <div className="my-4 h-48 w-32 flex justify-center items-center bg-green-400">
        Тут будет картинка
      </div>
      <table>
        <tbody>
          <tr className="border">
            <td className="border-r pl-1 pr-2">Название:</td>
            <td className="px-2">{door.name}</td>
          </tr>
          <tr className="border">
            <td className="border-r pl-1 pr-2">Размер:</td>
            <td className="px-2">{door.size}</td>
          </tr>
          <tr className="border">
            <td className="border-r pl-1 pr-2">Цвет двери:</td>
            <td className="px-2">{door.color}</td>
          </tr>
          <tr className="border">
            <td className="border-r pl-1 pr-2">Цвет внетренней панели:</td>
            <td className="px-2">{door.innerPanelColor}</td>
          </tr>
          <tr className="border">
            <td className="border-r pl-1 pr-2">Уплотнитель:</td>
            <td className="px-2">{door.uplotnitel}</td>
          </tr>
          <tr className="border">
            <td className="border-r pl-1 pr-2">Замки:</td>
            <td className="px-2">{door.zamki}</td>
          </tr>
          <tr className="border">
            <td className="border-r pl-1 pr-2">Противосъём:</td>
            <td className="px-2">{door.protivosem ? "Есть" : "Нет"}</td>
          </tr>
          <tr className="border">
            <td className="border-r pl-1 pr-2">Внешняя панель:</td>
            <td className="px-2">{door.vneshPanel}</td>
          </tr>
          <tr className="border">
            <td className="border-r pl-1 pr-2">Короб:</td>
            <td className="px-2">{door.clouseBox ? "Закрытый" : "Открытый"}</td>
          </tr>
          <tr className="border">
            <td className="border-r pl-1 pr-2">Наполнение:</td>
            <td className="px-2">{door.inner}</td>
          </tr>
          <tr className="border">
            <td className="border-r pl-1 pr-2">Доп размеры:</td>
            <td className="px-2">{door.sizesDoor}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
