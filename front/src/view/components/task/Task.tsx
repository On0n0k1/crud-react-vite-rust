import { Task as ModelTask } from '../../../model/Task';
import { Card } from './card/Card';

interface ChildProps {
    handleRemove: () => void;
    task: React.MutableRefObject<ModelTask>;
}

export function Task({ handleRemove, task }: ChildProps) {

    return (
        <div className='
            flex justify-center items-center p-2
        '>
            <Card task={ task }/>
            <button className='
                ml-4 mr-2 lg:ml-8 lg:mr-4
                border-white border rounded-2xl
                hover:bg-gray-700
            ' onClick={ handleRemove }>
                <p className='
                    p-2 px-4 font-mono font-bold
                '>x</p>
            </button>
        </div>
    )
}

export default Task;