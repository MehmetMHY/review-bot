echo "Current Git-Status:"
git status
echo
echo "Current Branch:"
echo $(git branch)
read -p "[ENTER TO CONTINUE OR CTRL-C]" temp
echo ">Git Adding All"
git add --all
echo ">Git Commmiting..."
read -p "Comment: " comment
git commit -m "$comment"
echo ">Git Pushing!"
read -p "[ENTER TO CONTINUE OR CTRL-C]" temp
git push
echo ">DONE!"



