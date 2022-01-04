def test_args_by_name(first="Sébastien",last="Barbieri",encoding="UTF-8"):
  return f"{first}, {last} ({encoding})"

print("no params", test_args_by_name())
print("order", test_args_by_name("Jean-Baptiste","Poquelin"))
print("name", test_args_by_name(first="Déborah"))
print("mixed", test_args_by_name("Jean-Baptiste",encoding="ASCII"))
# if you mix, you must follow the order first
# print("mixed and order", test_args_by_name(encoding="ASCII","Jean-Baptiste","Vandevelde"))