import { useState, useEffect } from 'react';
import { getData } from 'service/getData';

type DataType = {
    id: number;
    profileImage: string;
    name: string;
    error: boolean;
}

const useViewModel = () => {
    const [isError, setIsError] = useState<boolean>(false);
    const [data, setData] = useState<Array<DataType>>([]);
    useEffect(() => {
        let errors = [1,2];
        getData().then((response) => {
            let temp = response.map((item, key) => {
                return {...item , error :errors.includes(key)};
            });
            setData(temp);
        });
      }, []);

    const onRemoveData = (index: number) => {
        let newData = data.filter( (item, key) => {
            return key != index;
        });
        setData(newData);
    };

    const onDuplicateData = (index: number) => {
        let dulData = data.find((item, key)=> {
            return key === index;
        });
        if (dulData) {
            let tempData = data;
            tempData.splice(index, 0, dulData);
            let newData = tempData.map((item, key) => {
                item.id = key;
                return item;
            });
            setData(newData);
        }
    };

    const filterErrors = (enabled: boolean) => {
        setIsError(enabled);
    }

    return {data, onRemoveData, onDuplicateData, isError, filterErrors};
};
export default useViewModel;