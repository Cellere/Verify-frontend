import { Button } from "@tremor/react";

export const OpenDialogButton = ({
    queryType,
    handleClickOpen,
}: {
    queryType: string;
    handleClickOpen: () => void;
}) => {
    return (
        <button
            onClick={handleClickOpen}
            className="text-sm md:text-base px-4 py-2 flex justify-center items-center
                        text-black border border-primary-700 hover:bg-primary-100 
                       hover:shadow-lg transition-all duration-300 ease-in-out rounded-lg 
                       w-full md:w-auto"
        >
            <span className="break-words text-center leading-tight">
                Informações disponíveis na {queryType}
            </span>
        </button>
    );
};
