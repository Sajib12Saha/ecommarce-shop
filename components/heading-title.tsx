export const HeadingTitle  = ({title}:{title:string}) => {

    return(
             <div className="flex w-full justify-center">
     <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800">
        {title}
        </h1>
        </div>
    )

}