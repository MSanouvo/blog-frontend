import Preview from '../Components/ArticlePreview'
import NavBar from '../NavBar/NavBar'
import { useEffect, useState } from 'react'

const ReaderDashboard = () => {

    // useEffect = () => {
    //     /* GET api data and use it to load articles */
    // }


    return(
        <div className='container'>
            <NavBar 
                header={'Reader Dashboard'}
                button={true}
            />
            <Preview 
                title={"Title"}
                body={"Body Content"}
                date={"1/20/2000"}
            />
        </div>
    )
}

export default ReaderDashboard;