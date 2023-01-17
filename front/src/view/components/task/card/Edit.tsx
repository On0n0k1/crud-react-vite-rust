interface EditProps{
    toggleEditMode: () => void,
    editMode: boolean,
}

export function Edit({ toggleEditMode, editMode }: EditProps) {
    const text = editMode ? "Save" : "Edit";

    return (<div className='
        w-full p-2
        grid items-center col-span-2
    '>
        <button className='
            p-4 hover:bg-gray-700
            rounded-xl border-white
        ' onClick={ toggleEditMode }>
            { text }
        </button>
    </div>);
}

export default Edit;