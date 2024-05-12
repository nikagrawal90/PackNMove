import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import { useDispatch, useSelector } from "react-redux";
import { selectPlan } from "../states/slices/planSlice";
import { getPlans } from "../states/slices/planSlice";
import Spinner from "./Spinner";
import { getPlansApi } from "../auth/auth";

const HorizontalScrollCards = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectPlan);
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        setLoading(true);
        const fetchData = () => {
            getPlansApi().then((response) => {
                dispatch(getPlans(response.data));
                setLoading(false)
              }).catch(e => {
                console.log(e)
                dispatch(getPlans([]))
                setLoading(false)
              });
          };
          fetchData();
    }, []);

  return (
    <div className="text-center bg-white m-auto p-4 overflow-scroll">
            <h1 className="font-titillium-web lg:px-5 md:px-5 px-5 lg:mx-5 md:mx-5 mx-5 my-5 font-bold text-4xl text-gray-800">
                Choose an option
            </h1>
            {
                loading? (<Spinner />): (
                    <div className="container p-2 m-2">
                        <div className="overflow-x-scroll pb-10 hide-scroll-bar">
                            <div className="flex lg:m-30 md:m-10 m-5">
                                {
                                    
                                    products.length > 0 && products.map(product => {
                                        return <Cards key={product.id} product={product} />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                )
            }
    </div>
  );
};

export default HorizontalScrollCards;
