
import React from 'react'

const DrugboardUserProfile = ({params}) => {

  // const [slug, setSlug] = React.useState("");

  // React.useEffect(()=>{
  //   if(params?.slug)
  //   setSlug(params?.slug);
  // },[params?.slug]);

  return (
    <div>Welcome {params.username}</div>
  )
}

export default DrugboardUserProfile