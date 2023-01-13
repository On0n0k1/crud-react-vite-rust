import { Task as ModelTask } from '../../../model/task'

interface DescriptionProps{
    task: React.MutableRefObject<ModelTask>
}

// export function Description({text}: { text: string}) {
export function Description({ task }: DescriptionProps) {
    console.log(task.current.description);

    return (
        <div className='flex justify-center items-center p-3'>
            <div className='
                hidden
                lg:grid items-center
                px-2
            '>
                <p className='
                    text-2xl font-inherit
                    pl-4
                '><b>Description:</b></p>
            </div>
            <div className='
                w-4/5  grid items-center
                px-2 py-4
            '>
                <p className='font-inherit'>
                    { task.current.description }
                </p>
                
            </div>
        </div>

        
    );
}
