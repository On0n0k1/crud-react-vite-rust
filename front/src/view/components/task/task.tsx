import { Task as ModelTask } from '../../../model/task'

import Card from './card';

interface ChildProps {
    handleClick: () => void;
    task: React.MutableRefObject<ModelTask>;
}

export default function Task({ handleClick, task }: ChildProps) {

    return (
        <div className='
            flex justify-center items-center p-2
        '>
            <Card task={ task.current }/>
            <button className='
                ml-4 mr-2 lg:ml-8 lg:mr-4
                border-white border rounded-2xl
                hover:bg-gray-700
            ' onClick={ handleClick }>
                <p className='
                    p-2 px-4 font-mono font-bold
                '>x</p>
            </button>
        </div>
    )
}

