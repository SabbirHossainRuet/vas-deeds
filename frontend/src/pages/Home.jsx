import { useContext, useEffect, useState } from "react"
import { DeedContext } from "../context/DeedContext"
import DeedItem from "../components/DeedItem";

const Home = () => {
    const { deeds } = useContext(DeedContext);
    const [ filterDeeds, setFilterDeeds ] = useState([]);

    const applyFilter = () =>{
        let deedsCopy = deeds.slice();
        setFilterDeeds(deedsCopy);
    }

    useEffect(()=>{
        applyFilter();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[deeds])

    console.log(filterDeeds);

  return (
    <div className="border-t">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6">
            {filterDeeds.map((item,index)=>(
                <DeedItem key={index} id={item._id} name={item.name} date={item.date}/>
            ))}
        </div>
    </div>
  )
}

export default Home