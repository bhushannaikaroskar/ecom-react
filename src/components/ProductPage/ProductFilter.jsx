import { useProductContext } from "../../context/productContext/ProductProvider";

export default function ProductFilters() {
    const { state, dispatch } = useProductContext();

    return (
        <aside className="grand-filter sidebar sidebar-hidden">
            <ul className="list">
                <div className="grand-filter-header">
                    <h2 className="font-black fw-700 p-y-2">Filters</h2>
                    <button className="btn btn-link-primary font-small">
                        CLEAR ALL
                    </button>
                </div>
                <li className="list-item">
                    <h3 className="font-black p-y-1">Sort</h3>
                    <ul className="list">
                        <li className="list-item p-x-0 ">
                            <label>
                                <input
                                    type="radio"
                                    name="sort"
                                    onChange={() =>
                                        dispatch({
                                            type: "SORT",
                                            payload: "LOW_TO_HIGH",
                                        })
                                    }
                                />{" "}
                                Low To High
                            </label>
                        </li>
                        <li className="list-item p-x-0">
                            <label>
                                <input
                                    type="radio"
                                    name="sort"
                                    onChange={() =>
                                        dispatch({
                                            type: "SORT",
                                            payload: "HIGH_TO_LOW",
                                        })
                                    }
                                />{" "}
                                High To Low
                            </label>
                        </li>
                        <li className="list-item p-x-0">
                            <label>
                                <input
                                    type="radio"
                                    name="sort"
                                    onChange={() =>
                                        dispatch({
                                            type: "SORT",
                                            payload: "POPULARITY",
                                        })
                                    }
                                />{" "}
                                Popularity
                            </label>
                        </li>
                    </ul>
                </li>

                <li className="list-item">
                    <h3 className="font-black p-y-1">Categories</h3>
                    <ul className="list">
                        <li className="list-item p-x-0 ">
                            <label>
                                <input
                                    type="checkbox"
                                    name="board"
                                    onChange={() =>
                                        dispatch({
                                            type: "CATEGORY",
                                            payload: "board",
                                        })
                                    }
                                />{" "}
                                Chess Boards{" "}
                            </label>
                        </li>
                        <li className="list-item p-x-0 ">
                            <label>
                                <input
                                    type="checkbox"
                                    name="board"
                                    onChange={() =>
                                        dispatch({
                                            type: "CATEGORY",
                                            payload: "set",
                                        })
                                    }
                                />{" "}
                                Chess sets{" "}
                            </label>
                        </li>
                        <li className="list-item p-x-0 ">
                            <label>
                                <input
                                    type="checkbox"
                                    name="board"
                                    onChange={() =>
                                        dispatch({
                                            type: "CATEGORY",
                                            payload: "pieces",
                                        })
                                    }
                                />{" "}
                                Chess Pieces{" "}
                            </label>
                        </li>
                        <li className="list-item p-x-0">
                            <label>
                                <input
                                    type="checkbox"
                                    name="accessories"
                                    onChange={() =>
                                        dispatch({
                                            type: "CATEGORY",
                                            payload: "accessories",
                                        })
                                    }
                                />{" "}
                                Chess Accessories
                            </label>
                        </li>
                    </ul>
                </li>
                <li className="list-item">
                    <h3 className="font-black p-y-1">Ratings</h3>
                    <ul className="list">
                        <li className="list-item p-x-0">
                            <label>
                                <input
                                    type="radio"
                                    name="ratings"
                                    onChange={() =>
                                        dispatch({ type: "RATING", payload: 4 })
                                    }
                                />{" "}
                                4 star
                            </label>
                        </li>
                        <li className="list-item p-x-0">
                            <label>
                                <input
                                    type="radio"
                                    name="ratings"
                                    onChange={() =>
                                        dispatch({ type: "RATING", payload: 3 })
                                    }
                                />{" "}
                                3 star
                            </label>
                        </li>
                        <li className="list-item p-x-0">
                            <label>
                                <input
                                    type="radio"
                                    name="ratings"
                                    onChange={() =>
                                        dispatch({ type: "RATING", payload: 2 })
                                    }
                                />{" "}
                                2 star
                            </label>
                        </li>
                        <li className="list-item p-x-0">
                            <label>
                                <input
                                    type="radio"
                                    name="ratings"
                                    onChange={() =>
                                        dispatch({ type: "RATING", payload: 1 })
                                    }
                                />{" "}
                                1 star
                            </label>
                        </li>
                    </ul>
                </li>
                <li className="list-item">
                    <h3 className="font-black p-y-1">Price</h3>
                    <div className="grand-slider-wrapper">
                        <div className="slider-range">
                            <label>0</label>
                            <label>5000</label>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="5000"
                            step="500"
                            defaultValue={state.maxPrice}
                            className="grand-slider"
                            onChange={(e) => e.target.value = e.target.value} 
                            onClick={(e) =>
                                dispatch({
                                    type: "MAX_PRICE",
                                    payload: e.target.value,
                                })
                            }
                        />
                    </div>
                </li>
                <div className="p-2"> </div>
            </ul>
        </aside>
    );
}
