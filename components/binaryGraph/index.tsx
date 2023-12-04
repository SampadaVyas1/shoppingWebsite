import React, { useMemo, useState } from "react";
import { Group } from "@visx/group";
import { Cluster, hierarchy } from "@visx/hierarchy";
import {
  HierarchyPointNode,
  HierarchyPointLink,
} from "@visx/hierarchy/lib/types";
import { LinkVertical } from "@visx/shape";
import { LinearGradient } from "@visx/gradient";
import ModalBox from "../modalBox";

const citrus = "#000000";
const white = "#000000";
export const green = "#020202";
const aqua = "#222222";
const merlinsbeard = "#020202aa";
export const background = "#ffff";

interface NodeShape {
  name: string;
  children?: NodeShape[];
  imgUrl?: string;
  isModalRequired?: boolean;
}

const clusterData: NodeShape = {
  name: "Sampada Vyas",
  children: [
    {
      name: "A",
      isModalRequired: false,
      imgUrl:
        "data:image/png;base64,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",
      children: [
        {
          name: "A1",
          isModalRequired: true,
          imgUrl:
            "https://i.pinimg.com/originals/b8/ae/b1/b8aeb1b09d6c6529cbcf66b414052d57.png",
        },
      ],
    },
    {
      name: "B",
      isModalRequired: false,
      imgUrl:
        "data:image/png;base64,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",
      children: [
        {
          name: "B1",
          isModalRequired: true,
          imgUrl:
            "https://i.pinimg.com/originals/b8/ae/b1/b8aeb1b09d6c6529cbcf66b414052d57.png",
        },
        {
          name: "B2",
          isModalRequired: true,
          imgUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZth4srs693eCm9IBhPtbuMg83LmxFNsp8SK5tmtHtpiRcrMpJYzTBJHhezZq06A5kY8Y&usqp=CAU",
        },
        {
          name: "B3",
          isModalRequired: true,
          imgUrl:
            "https://icones.pro/wp-content/uploads/2022/03/icone-pc-ordinateur-et-ordinateur-portable.png",
        },
      ],
    },
    {
      name: "D",
      isModalRequired: false,
      imgUrl:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOoAAADXCAMAAAAjrj0PAAABC1BMVEX////iQyn8bSb8oybgMQn419PgQCn9pybiQCX8YQD9bSbpTyj8nADgLQDjRCnhOx3xXCfhPSD3ZSbhNBD8ah/+9PH8aybhNhX8ZhP2ZCb++fj0wbv0YCfrUij8ZhH8XgDpe23tmI776ef2zMfwpp3riX3wrKT7fUjydCf5nCb8oRzocmL64t/lWEPytq/1yMLtkofjSjLnalrkVT/mYE37m3j/7+j9p4b7jGL+2Mr3kibwaCf9uZ/+27T9yY3+4sP8q0DqgnXvSQD7dzz8wa79zb77k2r8ekH6glL8oH38sJX+4df2hib8vKj0iCf3lSf2iwD0iET+7Nj9wHj9tmH8sVH+3bn9vnL+0qI/tWgxAAALqElEQVR4nN2de0MTuRrG27QMzFB6o5S2lharK1jQXd3lIuguexBlV9FzXHX5/p/kzLSd6XRye5O8mYu/vzXkSZ558+SClkoqDCbHawOlv2GNweTR2o611o/3G1vVavXlmrWfAGbtaNvvytbRsZ3mH2816mWf1ta+nR8AZnC01SrPu/LERvuPt8ohu/s2fgCcZ42oK1vP8ZtfWyr1f8DP+D8AzsPteFfwP9j9Vqz9jRfo7SsQH/Ry40/s5nfiI+mPZYalaa260pVt7Gl9srvSfuMX5PYV+KWx0pVd7K/12cZK+1k6+EWiK7/hNn+88n1k6uA1qiu4i2vCNL6DH6K2r8BDqiu4H9N2ovnyRhm1fQXKG8m+bGM2/4CSmpmDKf/6Uh8gtv+yRbWflYMp//rx8CVe8xN6JDOrwS8o//oOm6A1/3iXbr5ctbSrEHNcZXRl9zFa+y3GSGK2rwBz1DfqWM0/Yo1keeNXrPZVeMYa9XL1EVLz+3RRmn0hGTiYijJzWvs4ze/QK01mDmb6t4yW+Z9wms/Cwb8y/YuW+XnNY9Z4IKxVbz7szzCaZ8STcCitHOyI4BkMqXD8RMeTcCiRt09yfuMZDCXzDzhFaTaUKTuY699yub5r3jwj6Uek7WC+f1EyP98z6TtY1BfzzM9ZsxdYOJkUsCPui+nXxNgzxUA/whLyXOBfhESzWxc1j7lTlMPYNcfYaJm1/jMz6S+ppuhgXkCN+mKW+Y+EA+nXvRQd/Fwi1SzzTySTWm4dIekAIBt2s8zP20gsSa8GD4T1N8BomWcd5CRGEvO0Togoy8wx2Wrxk35Eeg6W+tco8/8pXFQX05rS2whRFg9p/KTduvRLLafnYLl//czf0B13WXWfgXWsI4NzwIU07qJ0HWs+FQeDHKad3sRJ33wklYD4t6yd+amLRs5I7uOKYgPyr/ZNkjjpx0YSWRUTmMPKGxs6jT+QhcKQ7RRe9si2HRFamR+wZM/Bf05DA1nhZ+h8ToIjqwT1lvUaPGgBPyatbaU86S9bx7oc4sK+IGOikfnroEV1hn4eg8I/i6ZQv+JWGEd/JG3IiwNdDAKUH2kA17E5th2sNO6qHpOd45i1roqCf9Uzv/gcMgneBT0b+qmSCMWkyr6H51K1+ohpTcW/qpkfmPQj7D4kBYbxCKXMr9q43Wd4av5VzPwNheI+w+YzPMAJ1yoqmR+4OYxh8xme+NqIhcLiJ74cYWGzBqv6VyXzw5P+Ens1mPnUTtYbaOZXd4xNB+v0Bpz5mU8KJdh7xMR9SyTqDTDzKyXOCFvP8FSX+EVvYN+TUtKPaFh6hqewb473BpTK1ZJ+hK2n0PIbMhawzC96MSPCjoP1/Au849YpAwF2HpLq+Rf2zkg5hkWNo7xoTKK4xVoCyPxK2+AVqhae4UlfKHCRL/QD5aQfa3wNHZ38MEceVUEXjTytVXS0lfomk106vNT9NnKHLPPr1vY8Inl8o/9t5A9J5tcvSvlDnN/Ad3uFQLiHBl80FgJR5tdfsPPJLj/z6yb9vCLI/OoHVvmGn/m1k35u4W4swQ8OCgMv88MefBUKXuY3Sfp5hZP5YU8KiwX7ufLxfzbrjpN131BxnPrWKUPqWY+QbvOHkevL3Bt2yeg1Q6rnkRnt5mbh1TrOZrM9U9O5ppW+cklEt9BqnfLmcKnFpZfWwL9LvG6zXkix/nwO40JI729K6rVHErSLN7VOvdlNqOgcJJVOxkmlMyMXaWr9Ce1T80XIOHnu8nbEkOozLIpYx9lLTuic0U1C6rsOWyrx+psFEOuUm4wJndH7KyG1x/uTRRDrC+X2nniJ5ebU5f9ZknMbO45AqI+7ehbxSiyVkPwWKN43upT6YUXqHacqxdjLpVZnsy3r+OitIECwaefvk3XqQ3m/EyHilleAV2jmTKuzxy+mSzrvVqQegKSSbp4m1qm3IUqTeYmA/pJfufMzsc4erMuk8z6udAD4VBd081KKh8DZ8WcxvtrsyNaaOHkoxc6mZIWJM9rRleoNM9cqCQ0J3BWprH0Nn4xN7Ncjpe662rMakKWJnU3FzppJzdDEauY1l5qZiVXNS0uVR2CaLEysbN6AlQpcuoQuUjEyiBMOdwMu6ifRCYYJ2umaWMe8hAqGsLhPk2Ym1jJvIPV2RSpkE8ckPRNrmXcmdfVw6bVOXZqRkok1zRvQW722kR648PHSMLGzqTmlhDodnehLTaMSa5s3IHlrYyDVN7FlofrmnUldVVo61yzBC2yaWLfyLkgUYNCRoQiLJjYyL2FcxX0wcjCxV4nrfcOOua8SUksds7EjdkxsaN6AEfXQ8MTsYyVWTKy+YaPonCeVlm5MHUwsmNjUvIQ62w8YjIwdTHBNbBIblriMF/zmDiaoJkYwL2H6F6EGz2ljvf5HMK+Pm7wzn3GNMa0Ex8RK57wCvA5LKfc5hHLz5ibGMS9hPuWZYb60Luibmpj1UkULl/XE0OdvpGklZiZ26jjmJdR9YwwXazBNTAy+YQMw5kyqyVkETV9XqWG6j8OfVPg1KwSt0wnDrWkC3pcagJEOIzRMjGlev/ye8ZXqH5KyUc3EmOYN1lThP5ggeaqljIqJcc3LC0pL7nC1KpgYYWu6Qo+Vfi1aGG5itIC0QGLfgB3Bw0o9ICbGNq+/pFLnLDSv1B4LyAGYGNu8/o5cWH1DXiOXJrmJsc3LOBHlcIIYmhaITIxvXtKRf6gLznXv5fjwTYxvXuL1BDEpwS2+Vp6J8c1LvMQLYDEH+FqZbycsmNdXCii+8XnF/14ZD4AsmFdZaan0Dr0O0w+AcDPvHHWlpdIZ9voaEDexDfOSTk/lOw15O0bOiAFDq+YlHQKvvXE+EAvFKVxiLVRefzNzq/tfAAzOLXywiyXWhnld+n4GzmvXgon9JdaGeXvXeuYNsWFibwj6TQrFRt0TI6ElGybuHlYO8VOv7MwBxB3e8XBA++N6Zf0T+JcMYIzem5k35IOHZ+Ju+/N6pVJZf9pHO8L3zTtO/uKmPmjRyTdvoDQQi2fiDvXbuCbcocQJLzBvyPonpEuokWHlTYJRibvti6XSwMSXCCb2XNDRihLGJu5ePo0rDTA3Ma55Q8wysdc+TAqtmFfi0QGueUOOr/VN7PU/0UpNTWzDvCHaJvbNyxBqWIlxYgOPt3qZmGVe40o8OrD7P/pOLtVN7A2Z5o20ftaJE97YnnlDTlRN3O1TlTehtXKpbOJOT/1cRR1FE7cPhTrnYj8Cfj0+zug2nf+OeqJSiYcfxVMamnioYGJvzHmOZAGwibvDzxClAfBVp9NJw7whN7A40b4E6lQxcVrmDZlcA87EYeaNtF5ATOy56Zk35GQsWQ695oWKUpiJ0zVvyI24Ere5AUkwsR8lccJN2bwhk/cCEw8FAUmg9UIUJ9KsvEn+4h07aZg3hG/ibMwbcjNimrg7VDdvNLGHnPfd7nkq/4M6l1NWJe5rmTfSesHaxHbGrH9SM13Okib2msJ0D4E2cY/o3LBhk6jEvnlNldImztq8IacHMRObmTfSumLijpu9eUPOojjRVApIAmInMfkwb8jCxN0mON1LiUycF/OG7AQm7l9W0JSGJzEd9y5rbRRnYzTzhjztd/Jl3pCb/yIrrVSm/8O7d0Llvoat9MrOgTYCXypTTKW1f7IWJGDwFW9ip7U3WcsR8zuW1mnlS9ZaZHyZopi49jVrIQB2viFMbO0+axkwjE1cAPOG/GFm4trXfCVBITtXBhNb+z3r7qvxj67W6fSPrPuuyvealolr37I5/TTi9EpDa9HMG/KvqomntcKZN+SNmolrVwU0b4hS/i+qeUPA+X9a+551X00BbmJzvDWFA8r/ud6awpFvYnO/NYUjyf/Tq8KkeznC/F/7N+vuoSLYxBZlawqHY+ICbU3hME1ciHMVdU7pTeyPZ96QxCZ2Ov0BzRuysomtfSvQuYo6SxNPi57u5dxXatPptFb79gObN+LLm/v77xmE+/8DKU9nJEngm3UAAAAASUVORK5CYII=",
      children: [
        {
          name: "Z",
          isModalRequired: true,
          imgUrl:
            "https://i.pinimg.com/originals/b8/ae/b1/b8aeb1b09d6c6529cbcf66b414052d57.png",
        },
        {
          name: "web",
          isModalRequired: true,
          imgUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZth4srs693eCm9IBhPtbuMg83LmxFNsp8SK5tmtHtpiRcrMpJYzTBJHhezZq06A5kY8Y&usqp=CAU",
        },
      ],
    },
    {
      name: "D",
      isModalRequired: false,
      imgUrl:
        "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png",
      children: [
        {
          name: "Z",
          isModalRequired: true,
          imgUrl:
            "https://i.pinimg.com/originals/b8/ae/b1/b8aeb1b09d6c6529cbcf66b414052d57.png",
        },
        {
          name: "web",
          isModalRequired: true,
          imgUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZth4srs693eCm9IBhPtbuMg83LmxFNsp8SK5tmtHtpiRcrMpJYzTBJHhezZq06A5kY8Y&usqp=CAU",
        },
      ],
    },
  ],
};

function RootNode({ node }: { node: HierarchyPointNode<NodeShape> }) {
  const width = 40;
  const height = 20;
  const centerX = -width / 2;
  const centerY = -height / 2;

  return (
    <Group top={node.y} left={node.x}>
      <rect
        width={width}
        height={height}
        y={centerY}
        x={centerX}
        fill="url('#top')"
      />
      <text
        dy=".33em"
        fontSize={9}
        fontFamily="Arial"
        textAnchor="middle"
        style={{ pointerEvents: "none" }}
        fill={background}
      >
        {node.data.name}
      </text>
    </Group>
  );
}

function Node({
  node,
  onclick,
}: {
  node: HierarchyPointNode<NodeShape>;
  onclick: any;
}) {
  const isRoot = node.depth === 0;
  const isParent = !!node.children;

  if (isRoot) return <RootNode node={node} />;

  return (
    <Group top={node.y} left={node.x}>
      {node.depth !== 0 && (
        <>
          {
            <image
              href={node.data.imgUrl}
              width={40} // Set width as needed
              height={40} // Set height as needed
              onClick={() => {
                node.data.isModalRequired && onclick();
              }}
            />
          }
        </>
      )}
    </Group>
  );
}

const defaultMargin = { top: 40, left: 0, right: 0, bottom: 40 };

export type DendrogramProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export default function Example({
  width,
  height,
  margin = defaultMargin,
}: DendrogramProps) {
  const data = useMemo(() => hierarchy<NodeShape>(clusterData), []);
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;
  const [showModal, setShowModal] = useState<boolean>(false);
  const onClickonNode = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  return width < 10 ? null : (
    <div>
      <svg width={width} height={height}>
        <LinearGradient id="top" from={green} to={aqua} />
        <Cluster<NodeShape> root={data} size={[xMax, yMax]}>
          {(cluster: any) => (
            <Group top={margin.top} left={margin.left}>
              {cluster.links().map((link: any, i: any) => (
                <LinkVertical<
                  HierarchyPointLink<NodeShape>,
                  HierarchyPointNode<NodeShape>
                >
                  key={`cluster-link-${i}`}
                  data={link}
                  stroke={merlinsbeard}
                  strokeWidth="1"
                  strokeOpacity={0.2}
                  fill="none"
                />
              ))}
              {cluster.descendants().map((node: any, i: any) => (
                <Node
                  key={`cluster-node-${i}`}
                  node={node}
                  onclick={onClickonNode}
                />
              ))}
            </Group>
          )}
        </Cluster>
      </svg>
      <div>
        <div>
          {showModal && (
            <div className={""}>
              <ModalBox closeModal={closeModal} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
