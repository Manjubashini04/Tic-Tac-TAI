export const getAIMoveFromOpenRouter = async (board) => {

    console.log(board);

    const systemPrompt = `
           you are a smart Tic Tac Toe AI playing as "O".
           your goal:
           1. win if possible
           2. Block the opponent if they are about to win
           3. Otherwise: choose center > corner > side
    
           only return ONE number between (0-8). Do not explain.`

           const userPrompt = `
           current board:${JSON.stringify(board)}

           Each cell is indexed like this:
           [0] [1] [2]
           [3] [4] [5]
           [6] [7] [8]

           "O" = you(AI)
           "X" = human
            null = empty

            what is your move?
    `
    const getMoveFromClaude = async () => {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer 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`,
                "content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "deepseek/deepseek-r1",
                //model2: "anthropic/claude-3-haiku",
                 temperature: 0.2,
                 messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt }
                ]
            })

        });
        console.log(response);

        const data = await response.json();
        console.log(data);
        const text = data.choices?.[0]?.message?.content?.trim();
        console.log(text);
        const match = text.match(/^\d+/);

        return match ? parseInt(match[0], 10) : null;
    }
        try{
            let move = await getMoveFromClaude();
            return move;
        }catch(err){
            console.log("AI",err);
            const preferredOrder = [4, 0, 2, 6, 8, 1, 3, 5, 7]; // center > corners > sides
            return preferredOrder.find(i => board[i] === null ?? null); // return first empty cell
        }
    }
