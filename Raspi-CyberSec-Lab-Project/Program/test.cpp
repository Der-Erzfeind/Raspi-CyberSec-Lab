#include <iostream>
#include <string>
#include <vector>

class MenuManager{
private:
	std::vector<Menu> menues;


void display() const {
        clearScreen();
        std::cout << "   " << "\033[30;47m" << "\n     " << title << "     \n\n" << "\033[0m\n";     //selected Option gets highlighted
        for (size_t i = 0; i < (options.size()-1); ++i) {
            if (i == selectedOption) {
                std::cout << "   " << "\033[43m" << options[i].getName() << "\033[0m\n";     //selected Option gets highlighted
            } else {
                std::cout << "   " << options[i].getName() << "\n";
            }
        }
	if(selectedOption == options.size()-1){
                std::cout << "\n   " << "\033[43m" << options[options.size()-1].getName() << "\033[0m\n";     //selected Option gets highlighted
            } else {
                std::cout << "\n   " << options[options.size()-1].getName() << "\n";
            }
    }

    void navigate() {
        selectedOption = 0;
        while (true) {
            display();
            int key = getch();

            if (key == 27) { // Escape sequence
                if (getch() == 91) { // '['
                    switch (getch()) {
                        case 'A': // Up arrow
                            if (selectedOption > 0)
                                selectedOption--;
                            else
                                selectedOption = options.size() - 1;
                            break;
                        case 'B': // Down arrow
                            if (selectedOption < options.size() - 1)
                                selectedOption++;
                            else
                                selectedOption = 0;
                            break;
                    }
                }
            } else if (key == 10 || key == 13) { // Enter key
                // Execute the selected option's action
                options[selectedOption].execute();

                // If the selected option is "Exit" or "Back", break the loop
                if (selectedOption == options.size()-1) {
                    break;
                }
            }
		sleep(0.03);
        }
    }

    void setSelectedOption(int index) {
        if (index >= 0 && index < (int)options.size()) {
            selectedOption = index;
        }
    }

void clearScreen() const {
        std::cout << "\033[2J\033[1;1H"; // ANSI escape code to clear screen and move cursor to top-left
    }

    // Function to get a single character input without waiting for Enter
    int getch() const {
        struct termios oldt, newt;
        int ch;
        tcgetattr(STDIN_FILENO, &oldt);            // Get current terminal attributes
        newt = oldt;
        newt.c_lflag &= ~(ICANON | ECHO);          // Disable canonical mode and echo
        tcsetattr(STDIN_FILENO, TCSANOW, &newt);   // Apply new attributes
        ch = getchar();                            // Read one character
        tcsetattr(STDIN_FILENO, TCSANOW, &oldt);   // Restore old attributes
        return ch;
    }

class Action {
public:
	virtual ~action() {}
	virtual void execute() = 0;
};

class NavigateSubMenu : public Action {
private:
	std::string title;
	Menu& SubMenu;
	MenuManager& MenuManager;
public:
	MenuOption(std::string title, Menu& SubMenu) : title(title), SubMenu(SubMenu) {}
	
	void execute() override {
		MenuManager.navigate(this->
		

class Menu{
private:
	std::string title;
	std::vector<	

