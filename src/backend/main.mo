import List "mo:core/List";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Migration "migration";

(with migration = Migration.run)
actor {
  type Submission = {
    name : Text;
    email : Text;
    phone : Text;
    company : Text;
    message : Text;
    timestamp : Time.Time;
  };

  let submissionList = List.empty<Submission>();

  public shared ({ caller }) func submitForm(name : Text, email : Text, phone : Text, company : Text, message : Text) : async () {
    let submission : Submission = {
      name;
      email;
      phone;
      company;
      message;
      timestamp = Time.now();
    };
    submissionList.add(submission);
  };

  public query ({ caller }) func getAllSubmissions() : async [Submission] {
    submissionList.toArray();
  };
};
