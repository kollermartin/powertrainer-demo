import { FilterConfirmProps, FilterDropdownProps } from "antd/lib/table/interface";
import { Button, Divider, Flex, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { HandleSearch, SearchParams } from "../models/tables/handle-operations.model";
import classes from "./TableFilterDropdown.module.css";

interface TableFilterDropdownProps extends FilterDropdownProps {
    dataIndex: string;
    handleSearch: (value: SearchParams) => void;
}

const handleReset = (
    dataIndex: string,
    clearFilters: FilterDropdownProps["clearFilters"],
    handleSearch: (value: SearchParams) => void,
    confirm: (param?: FilterConfirmProps) => void,
    setSelectedKeys: FilterDropdownProps["setSelectedKeys"],
) => {
    if (clearFilters) {
        clearFilters();
        handleSearch({ [dataIndex]: null });
        setSelectedKeys([]);
        confirm();
    }
};

const handleFilterSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: string,
    handleSearch: (value: SearchParams) => void,
) => {
    confirm();
    handleSearch({ [dataIndex]: selectedKeys[0] });
};

const TableFilterDropdown = ({
    dataIndex,
    handleSearch,
    confirm,
    setSelectedKeys,
    selectedKeys,
    clearFilters,
}: TableFilterDropdownProps) => {
    const { t } = useTranslation("common");
    return (
        <div className={classes.filterDropdown}>
            <Input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={selectedKeys[0] as string}
                onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                className={classes.searchInput}
            />
            <Divider className={classes.divider} />
            <Flex justify="space-between">
                <Button
                    type="link"
                    onClick={() => {
                        if (clearFilters) {
                            handleReset(dataIndex, clearFilters, handleSearch, confirm, setSelectedKeys);
                        }
                    }}
                    size="small"
                >
                    {t("reset")}
                </Button>
                <Button
                    type="primary"
                    onClick={() => {
                        handleFilterSearch(selectedKeys as string[], confirm, dataIndex, handleSearch);
                    }}
                    icon={<SearchOutlined />}
                    size="small"
                >
                    {t("ok")}
                </Button>
            </Flex>
        </div>
    );
};

const RenderTableFilterDropdown =
    (dataIndex: string, handleSearch: HandleSearch) =>
    ({ setSelectedKeys, selectedKeys, clearFilters, prefixCls, confirm, close, visible }: FilterDropdownProps) => (
        <TableFilterDropdown
            dataIndex={dataIndex}
            handleSearch={handleSearch}
            prefixCls={prefixCls}
            setSelectedKeys={setSelectedKeys}
            selectedKeys={selectedKeys}
            confirm={confirm}
            close={close}
            visible={visible}
            clearFilters={clearFilters}
        />
    );

export default RenderTableFilterDropdown;
