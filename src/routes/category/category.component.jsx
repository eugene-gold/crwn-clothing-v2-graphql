import {  useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';

import { CategoryContainer, Title } from './category.styles';
import Spinner from "../../components/spinner/spinner.component";
import {gql, useMutation, useQuery} from "@apollo/client";

const GET_CATEGORY = gql`
  query($title:String!){
    getCollectionsByTitle(title: $title) {
      id
      title
      items {
        name
        id
        price
        imageUrl
      }
    }
  }
`

// const SET_CATEGORY = gql`
//   mutation($category:Category!){
//     addCategory(category: $category) {
//       id
//       title
//       items {
//         name
//         id
//         price
//         imageUrl
//       }
//     }
//   }
// `


const Category = () => {
  const { category } = useParams();
  const { loading ,error, data} = useQuery(GET_CATEGORY, {variables: {
    title: category
    }})

  // const [addCategory, { loading ,error, data }] = useMutation(SET_CATEGORY)
  //
  // addCategory({ variables: {category: categoryObject}})

  useEffect(()=> {
    if(data) {
      const  { getCollectionsByTitle: { items }  } = data;

        setProducts(items)

    }
  },[category, data])
  const [products, setProducts] = useState([]);

  return (
    <Fragment>
        {
            loading ? <Spinner/> : (
                <>
                <Title>{category.toUpperCase()}</Title>
            <CategoryContainer>
        {products &&
            products.map((product) => (
            <ProductCard key={product.id} product={product} />
            ))}
            </CategoryContainer>
                </>
            )
        }

    </Fragment>
  );
};

export default Category;
