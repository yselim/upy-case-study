import React, { useEffect, useState } from "react";
import { fetchAProduct } from "../../api/api";
import MainTemplate from "../../components/templates/mainTemplate/mainTemplate";
import { useParams } from "react-router-dom";
import "./productDetailPage.css";

export default function ProductDetailPage(props) {
  let { id } = useParams();
  const [product, setProduct] = useState(undefined);
  useEffect(() => {
    getTheProduct();
  }, []);

  const getTheProduct = async () => {
    const prdct = await fetchAProduct(id);
    setProduct(prdct);
  };

  console.log("product", product);
  return (
    <MainTemplate
      content={
        product && (
          <div className="productDetailPage">
            <div className="detailFirstRow">
              <div style={{ width: 180, height: 230 }}>
                <div className="avatarBox">
                  <img className="avatar" src={product.avatar} />
                </div>
              </div>

              <div className="detailSummaryBox">
                <div style={{ fontSize: "3rem", fontWeight: "500" }}>
                  {product.name}
                </div>
                <div style={{ fontSize: "1.4rem", fontWeight: "600" }}>
                  {"$ " + product.price}
                </div>
              </div>
            </div>

            <div style={{ fontSize: "1.4rem", fontWeight: "600" }}>
              {"Description"}
            </div>
            <p style={{whiteSpace: "pre-wrap"}}>{product.description}</p>

          </div>
        )
      }
    />
  );
}

// {
//   "_id": "62e653896fb2df3944371e7a",
//   "name": "Table",
//   "avatar": "https://media.istockphoto.com/photos/wooden-round-table-picture-id900257448?s=612x612",
//   "description": "Wood table",
//   "price": 22,
//   "category": "Furniture",
//   "developerEmail": "abeynidhin.g.l@gmail.com",
//   "createdAt": "2022-07-31T10:03:53.671Z",
//   "updatedAt": "2022-07-31T10:03:53.671Z",
//   "__v": 0
// }
