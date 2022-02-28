import TableHeaderItemType from "@/struct/ui/Table/TableHeaderItemType";

class DataCompanyList {
    public static TableHeaders: TableHeaderItemType[] = [
        {
            text: "ID",
            value: "id"
        },
        {
            text: "Название",
            value: "name"
        },
        {
            text: "Состояние",
            value: "status"
        }
    ];
}

export default DataCompanyList;
