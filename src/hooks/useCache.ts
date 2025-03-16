import * as SecureStore from "expo-secure-store";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";

export default function useCache() {
    const dailyFreeCacheKey = "dailyFree";
    const maxFreeCalls = 3;

    const {
        getItemAsync,
        setItemAsync,
    } = SecureStore;

    const [hasFreeCalls, setHasFreeCalls] = useState<boolean>();

    const useDailyFreeImages = useCallback(
        async () => {
            try {
                const current = await getItemAsync(dailyFreeCacheKey);
                if (current) {
                    const object = JSON.parse(current) as AppLoginModel;
                    if (object.currentFreeCalls > 0) {
                        object.currentFreeCalls -= 1;
                        await setItemAsync(dailyFreeCacheKey, JSON.stringify(object));
                    }

                }
            } catch (error) {
                console.error("Error in useDailyFreeImages", error);
            } finally {
                await fetchHasFreeCalls();
            }

        },
        [],
    );

    const addNewDailyFreeImages = useCallback(
        async () => {
            try {

                const current = await getItemAsync(dailyFreeCacheKey);

                if (current) {
                    const object = JSON.parse(current) as AppLoginModel;

                    const currentDate = moment();
                    const cacheDate = moment(object.date);

                    if (cacheDate.isBefore(currentDate, "day")) {
                        console.log("ADDING MORE 3 __");
                        //renew daily free
                        const addObject: AppLoginModel = {
                            date: moment().format(),
                            currentFreeCalls: maxFreeCalls,
                        }

                        await setItemAsync(dailyFreeCacheKey, JSON.stringify(addObject));
                    }
                } else {
                    console.log("ADDING MORE 3");
                    const addObject: AppLoginModel = {
                        date: moment().format(),
                        currentFreeCalls: maxFreeCalls,
                    }

                    setItemAsync(dailyFreeCacheKey, JSON.stringify(addObject));

                }

            } catch (error) {
                console.error("Error in addNewDailyFreeImages", error);
            } finally {
                await fetchHasFreeCalls();
            }
        },
        [],
    );

    const fetchHasFreeCalls = useCallback(
        async () => {

            const current = await getItemAsync(dailyFreeCacheKey);

            if (!current) setHasFreeCalls(false);

            const object = JSON.parse(current) as AppLoginModel;

            setHasFreeCalls(object.currentFreeCalls > 0 && object.currentFreeCalls <= maxFreeCalls);

        },
        [],
    );

    useEffect(() => {
        fetchHasFreeCalls()

    }, []);


    return {
        hasFreeCalls,
        useDailyFreeImages,
        addNewDailyFreeImages,
        fetchHasFreeCalls,
    }

}

type AppLoginModel = {
    date: string,
    currentFreeCalls: number
}