class WasRun:
    def __init__(self, name: str) -> None:
        self.was_run = None

    def test_method(self) -> None:
        self.was_run = 1

test = WasRun("test_method")
print(test.was_run)
test.run()
print(test.was_run)
