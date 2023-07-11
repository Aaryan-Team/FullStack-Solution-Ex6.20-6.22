
import { useMutation, useQuery,useQueryClient  } from "react-query";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnec, updateAnec } from "./requests";


const App = () => {
  const result = useQuery("anecdotes", getAnec, {
    retry: 1,
    refetchOnWindowFocus:false
  });
  const queryClient = useQueryClient()

  const anecdotes = result.data;

  
  const updateAnecMutation = useMutation(updateAnec,{
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })


  const handleVote = (anecdote) => {
    //console.log("vote");
    //console.log(anecdote);
    updateAnecMutation.mutate({...anecdote,votes:anecdote.votes+1})
  };

  if (result.isLoading) {
    return <div>loading data...</div>;
  }
  if (result.isError) {
    return (
      <span>Anecdote service not avaliable due to problems in server</span>
    );
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
