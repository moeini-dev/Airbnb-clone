import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/libs/getCurrentUser";
import getListingById from "@/app/libs/getListingById";
import ListingClient from "../ListingClient";

interface IParams {
  listingId: string;
}

export const instant = false;

async function ListingPage({params}: {params: IParams}) {

  try {
    const listing = await getListingById(params);
    const currentUser = await getCurrentUser();

    if(!listing) {
      return(
        <EmptyState />
      );
    }

    return(
      <ListingClient 
        listing={listing}
        currentUser={currentUser}
      />
    );
 
  } catch(error) {
    return(<div>Invalid Request. Go back to the homepage.</div>)
  }


}

export default ListingPage;