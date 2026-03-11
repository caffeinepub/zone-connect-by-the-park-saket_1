import List "mo:core/List";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Array "mo:core/Array";



actor {
  type ServiceType = {
    #weddingPhotography;
    #preWeddingShoot;
    #candidPhotography;
    #cinematicFilm;
    #bridalPortrait;
    #destinationWedding;
  };

  type Inquiry = {
    coupleNames : Text;
    weddingDate : Time.Time;
    phoneNumber : Text;
    serviceType : ServiceType;
    message : Text;
    timestamp : Time.Time;
  };

  let inquiryList = List.empty<Inquiry>();

  public shared ({ caller }) func submitInquiry(coupleNames : Text, weddingDate : Time.Time, phoneNumber : Text, serviceType : ServiceType, message : Text) : async () {
    let inquiry : Inquiry = {
      coupleNames;
      weddingDate;
      phoneNumber;
      serviceType;
      message;
      timestamp = Time.now();
    };
    inquiryList.add(inquiry);
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    inquiryList.toArray();
  };
};
