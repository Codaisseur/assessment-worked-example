import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Artwork from "../../components/Artwork";

import { fetchArtworks } from "../../store/artworks/actions";
import { selectArtworks } from "../../store/artworks/selectors";

export default function Artworks() {
  const dispatch = useDispatch();
  const artworks = useSelector(selectArtworks);

  useEffect(() => {
    dispatch(fetchArtworks());
  }, [dispatch]);

  return (
    <div>
      {artworks.map((artwork) => {
        return (
          <Artwork
            key={artwork.id}
            id={artwork.id}
            title={artwork.title}
            imageUrl={artwork.imageUrl}
            hearts={artwork.hearts}
            bidsNumb={artwork.bids.length}
          />
        );
      })}
    </div>
  );
}
