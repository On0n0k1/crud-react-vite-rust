

function HeadingName() {
    return (<span className='
        w-1/3
        font-inherit
    '>
        "Do Laundry"
    </span>)
}

function HeadingPriority() {
    return (<span className='
        w-1/4
        font-inherit
    '>
        <b className='hidden sm:inline'>Priority:</b> x
    </span>)
}

function HeadingDate() {
    return (<span className='
        sm:w-1/3 w-10 pb-1
        font-inherit
    '>
        <b className='hidden lg:inline'>Due: </b> 
        x<b className='hidden lg:inline'> days, </b><b className='lg:hidden sm:inline hidden'> d </b><b className='inline sm:hidden'>:</b>
        y<b className='hidden lg:inline'> hours, </b><b className='lg:hidden sm:inline hidden'> hr </b><b className='inline sm:hidden'>:</b>
        z<b className='hidden lg:inline'> minutes </b><b className='lg:hidden sm:inline hidden'> min </b><b className='inline sm:hidden'></b>
    </span>)
}

function Heading(){
    return (<div className='
        w-full p-3
        flex flex-wrap justify-center
        font-inherit
    '>
        <HeadingName />
        <HeadingPriority />
        <HeadingDate />
    </div>);
}

function Description() {
    return (
        <div className='flex justify-center items-center p-3'>
            <div className='
                hidden
                lg:grid h-32 items-center
                px-2
            '>
                <p className='
                    
                    text-2xl font-inherit
                    pl-4
                '><b>Description:</b></p>
            </div>
            <div className='
                w-4/5  grid items-center
                px-2
            '>
                <p className='font-inherit'>
                    Sed a ipsum egestas, scelerisque quam at, faucibus neque. 
                    Ut a egestas arcu. Praesent vitae fringilla 
                    nulla. Etiam quis posuere nisi. Phasellus interdum quam velit, nec 
                    luctus metus malesuada et.
                </p>
                
            </div>
        </div>

        
    );
}


function Card(){
    return (
        <div className='
            py-4
            rounded-3xl
            border border-white
            font-mono
        '>
            <Heading />
            <Description />
        </div>
    )
}


interface ChildProps {
    // myFunction: React.MutableRefObject<() => void>; // React MutableRefObject
    handleClick: () => void;
}

export default function Task({ handleClick }: ChildProps) {

    return (
        <div className='
            flex justify-center items-center p-2
        '>
            <Card />
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

